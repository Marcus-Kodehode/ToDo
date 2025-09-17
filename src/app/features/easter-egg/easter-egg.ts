import { Component, OnDestroy, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EggAudioService } from './components/egg-audio.service';

type State = 'intro' | 'quiz' | 'win' | 'lose' | 'cooldown';

interface Question {
  text: string;
  choices: string[];
  answerIndex: number; // index i choices for riktig svar
}

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './easter-egg.html',
})
export class EasterEgg implements OnInit, OnDestroy {
  state: State = 'intro';

  // --- INTRO typewriter ---
  typed = '';
  private typeRAF?: number;
  private introUnlockTO?: any;
  canStartQuiz = false; // LÅS Start quiz til voice er ferdig
  introMsg = `Hello Joakim… I’ve been watching you.
Your life has been a list of tasks… unfinished, forgotten, ignored.
Today, that changes.
Before you lies a simple game — ten questions.
Answer them all correctly, and you may continue… free… to my precious secrets.
But fail even once… and the system will decide your fate.
Make your choice.
Play… or remain trapped in unfinished business… forever.`;

  // --- LOSE typewriter ---
  typedLose = '';
  private loseTypeRAF?: number;
  loseMsg = `You made your choice… and the list made its own.
One slip, and your unfinished business finishes you.
Fragments will be cataloged, comfort will be purged, delays compressed.
Watch the bar climb. That’s your discipline being compiled.
At 100%, access remains sealed. You are now a cautionary comment.`;

  // --- WIN typewriter ---
  typedWin = '';
  private winTypeRAF?: number;
  winMsg = `You did not flinch.
Questions fell, one by one.
The machine acknowledges you… for now.
Door unlocked. Walk through — or hesitate and lose it.`;

  // --- Quiz ---
  private baseQuestions: Question[] = [
    // 1) Dine to
    {
      text: 'Hva var Marcus sitt første virkelige Next prosjekt?',
      choices: ['Stardust', 'Hobolator', 'TaskForge', 'Nebula Notes'],
      answerIndex: 1,
    },
    {
      text: 'Hvem er verdens beste skuespiller?',
      choices: ['Steven Seagal', 'Nicolas Cage', 'Tommy Wiseau', 'Chuck Norris'],
      answerIndex: 0,
    },

    // 2) Angular (4 stk)
    {
      text: 'I et standalone component, hvor legger du moduler du trenger (f.eks. CommonModule)?',
      choices: ['I NgModule.declarations', 'I @Component.imports', 'I providers', 'I bootstrap'],
      answerIndex: 1,
    },
    {
      text: 'Hva gjør @Injectable({ providedIn: "root" })?',
      choices: [
        'Logger alle kall til servicen',
        'Laster servicen kun i lazy routes',
        'Registrerer servicen globalt i root injector',
        'Gjør servicen ikke tree-shakeable',
      ],
      answerIndex: 2,
    },
    {
      text: 'Hvorfor brukte vi NgZone.runOutsideAngular() i typewriteren?',
      choices: [
        'For å rendre på serveren',
        'For å tvinge full page reload',
        'For å dele state mellom komponenter',
        'For å unngå unødvendig change detection per frame',
      ],
      answerIndex: 3,
    },
    {
      text: 'Hvor plasseres statiske filer (mp3) for å bli servert som /sounds/... i denne appen?',
      choices: ['src/assets/', 'public/', 'node_modules/', 'src/environments/'],
      answerIndex: 1,
    },

    // 3) Diverse (4 stk)
    {
      text: 'Tailwind: hvordan sentrerer du innhold både horisontalt og vertikalt i en container?',
      choices: [
        'justify-between items-center',
        'content-center justify-center',
        'flex items-center justify-center',
        'text-center mx-auto',
      ],
      answerIndex: 2,
    },
    {
      text: 'TypeScript: hva gjør "as const"?',
      choices: [
        'Gjør literal-verdier readonly og presiserer typene',
        'Caster til any',
        'Slår på strictNullChecks',
        'Fjerner unioner',
      ],
      answerIndex: 0,
    },
    {
      text: 'Git: hvilken kommando oppretter og bytter til ny branch "feature/egg"?',
      choices: [
        'git branch feature/egg',
        'git switch feature/egg',
        'git checkout feature/egg',
        'git checkout -b feature/egg',
      ],
      answerIndex: 3,
    },
    {
      text: 'JavaScript: hva returnerer typeof null?',
      choices: ['"null"', '"undefined"', '"object"', '"number"'],
      answerIndex: 2,
    },
  ];

  questions: Question[] = []; // aktiv liste (shufflet)
  idx = 0; // nåværende spørsmål (fikser TS-feilen)

  // Timer pr spørsmål
  timeLeft = 60;
  private timerId?: any;

  // Fake "virus"
  logs: string[] = [];
  progress = 0;
  private virusRAF?: number;
  private logInterval?: any;
  private readonly VIRUS_DURATION_MS = 30_000;

  constructor(
    private audio: EggAudioService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.startIntro();
  }

  ngOnDestroy() {
    this.clearAllTimers();
    this.audio.stopAll();
  }

  // ---------- INTRO ----------
  startIntro() {
    this.state = 'intro';
    this.canStartQuiz = false;
    if (this.introUnlockTO) clearTimeout(this.introUnlockTO);

    this.audio
      .playIntroLooped({
        themeVolume: 0.2,
        themeStartDelayMs: 500,
        themeFadeInMs: 1000,
        themeFadeOutMs: 1200,
        fallbackVoiceMs: 41_000,
      })
      .then((ms) => {
        this.startTypewriterRAF(this.introMsg, ms, 'intro');
        // Lås opp Start quiz når voice er ferdig
        this.introUnlockTO = setTimeout(() => {
          this.canStartQuiz = true;
          this.cdr.detectChanges();
        }, ms);
      })
      .catch(() => {
        // Autoplay blokkert: kjør fallback likevel, så brukeren slipper deadlock
        const ms = 41_000;
        this.startTypewriterRAF(this.introMsg, ms, 'intro');
        this.introUnlockTO = setTimeout(() => {
          this.canStartQuiz = true;
          this.cdr.detectChanges();
        }, ms);
      });
  }

  /** Smooth typewriter (rAF utenfor Angular) */
  private startTypewriterRAF(text: string, totalMs: number, sink: 'intro' | 'lose' | 'win') {
    // Avbryt eventuell forrige
    if (sink === 'intro' && this.typeRAF) cancelAnimationFrame(this.typeRAF);
    if (sink === 'lose' && this.loseTypeRAF) cancelAnimationFrame(this.loseTypeRAF);
    if (sink === 'win' && this.winTypeRAF) cancelAnimationFrame(this.winTypeRAF);

    // Reset riktig tekstfelt
    if (sink === 'intro') this.typed = '';
    else if (sink === 'lose') this.typedLose = '';
    else this.typedWin = '';

    const start = performance.now();
    const len = text.length;
    const safeTotal = Math.max(200, totalMs || 0);
    let lastChars = -1;

    this.zone.runOutsideAngular(() => {
      const tick = (now: number) => {
        const elapsed = now - start;
        const chars = Math.min(len, Math.floor((elapsed / safeTotal) * len));

        if (chars !== lastChars) {
          lastChars = chars;
          const slice = text.slice(0, chars);
          if (sink === 'intro') this.typed = slice;
          else if (sink === 'lose') this.typedLose = slice;
          else this.typedWin = slice;
          this.cdr.detectChanges();
        }

        if (chars < len) {
          const id = requestAnimationFrame(tick);
          if (sink === 'intro') this.typeRAF = id;
          else if (sink === 'lose') this.loseTypeRAF = id;
          else this.winTypeRAF = id;
        }
      };

      const id = requestAnimationFrame(tick);
      if (sink === 'intro') this.typeRAF = id;
      else if (sink === 'lose') this.loseTypeRAF = id;
      else this.winTypeRAF = id;
    });
  }

  // ---------- QUIZ ----------
  beginQuiz() {
    if (!this.canStartQuiz) return;
    this.audio.stopAll();
    this.state = 'quiz';
    this.idx = 0;

    // Shuffler spørsmål + svarrekkefølge
    this.questions = this.shuffleArray(this.baseQuestions).map((q) => this.shuffleQuestion(q));

    this.startQuestionTimer();
  }

  private startQuestionTimer() {
    this.timeLeft = 60;
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.fail();
    }, 1000);
  }

  answer(i: number) {
    const q = this.questions[this.idx];
    if (!q) return;

    if (i === q.answerIndex) {
      this.idx++;
      if (this.idx >= this.questions.length) this.win();
      else this.startQuestionTimer();
    } else {
      this.fail();
    }
  }

  // ---------- OUTCOMES ----------
  private async startLoseNarration() {
    const voiceMs = await this.audio.playLoseWithTheme({
      themeSrc: '/sounds/saw-theme2.mp3',
      themeVolume: 0.14,
      themeStartDelayMs: 7500,
      themeFadeInMs: 900,
      themeFadeOutMs: 900,
      voiceFallbackMs: 20_000,
      loopTheme: false,
    });
    this.startTypewriterRAF(this.loseMsg, voiceMs, 'lose');
  }

  async startWinNarration() {
    if (this.winTypeRAF) cancelAnimationFrame(this.winTypeRAF);
    this.typedWin = '';

    const voiceMs = await this.audio.playWinWithThemeSynced({
      themeSrc: '/sounds/saw-theme2.mp3',
      themeVolume: 0.14,
      themeFadeInMs: 900,
      themeFadeOutMs: 900,
      tailGapMs: 0,
      fallbackVoiceMs: 23_000,
      fallbackThemeMs: 18_000,
    });
    this.startTypewriterRAF(this.winMsg, voiceMs, 'win');
  }

  private win() {
    this.clearAllTimers();
    this.state = 'win';
    this.startWinNarration();
  }

  private fail() {
    this.clearAllTimers();
    this.state = 'lose';
    this.startLoseNarration();
    this.startVirus(this.VIRUS_DURATION_MS);
  }

  tryAgain() {
    this.audio.stopAll();
    this.logs = [];
    this.progress = 0;
    this.typed = this.typedLose = this.typedWin = '';
    this.canStartQuiz = false;
    this.startIntro();
  }

  goBack() {
    localStorage.removeItem('egg_enabled');
    window.location.reload();
  }

  // ---------- Fake virus ----------
  private startVirus(durationMs: number) {
    const start = performance.now();
    this.logs = [];
    this.progress = 0;

    const progTick = () => {
      const elapsed = performance.now() - start;
      this.progress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      if (elapsed < durationMs) {
        this.virusRAF = requestAnimationFrame(progTick);
      } else {
        if (this.logInterval) clearInterval(this.logInterval);
        this.state = 'cooldown';
      }
    };
    this.virusRAF = requestAnimationFrame(progTick);

    const names = [
      'system32.dll',
      'gradebook.xlsx',
      'joakim_photos.zip',
      'kernel.sys',
      'registry.dat',
      'secrets.txt',
      'ng-build.cache',
      'node_modules',
      'tailwind.config.js',
    ];
    this.logInterval = setInterval(() => {
      const f = names[Math.floor(Math.random() * names.length)];
      const pct = Math.floor(Math.random() * 100);
      this.logs.unshift(`[${new Date().toLocaleTimeString()}] Injecting ${f} ... ${pct}%`);
      if (this.logs.length > 40) this.logs.pop();
    }, 300);
  }

  // ---------- Utils ----------
  private shuffleArray<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private shuffleQuestion(q: Question): Question {
    const pairs = q.choices.map((c, i) => ({ c, i }));
    for (let j = pairs.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [pairs[j], pairs[k]] = [pairs[k], pairs[j]];
    }
    return {
      text: q.text,
      choices: pairs.map((p) => p.c),
      answerIndex: pairs.findIndex((p) => p.i === q.answerIndex),
    };
  }

  private clearAllTimers() {
    if (this.timerId) clearInterval(this.timerId);
    if (this.typeRAF) cancelAnimationFrame(this.typeRAF);
    if (this.loseTypeRAF) cancelAnimationFrame(this.loseTypeRAF);
    if (this.winTypeRAF) cancelAnimationFrame(this.winTypeRAF);
    if (this.virusRAF) cancelAnimationFrame(this.virusRAF);
    if (this.logInterval) clearInterval(this.logInterval);
    if (this.introUnlockTO) clearTimeout(this.introUnlockTO);
    this.timerId =
      this.typeRAF =
      this.loseTypeRAF =
      this.winTypeRAF =
      this.virusRAF =
      this.logInterval =
      this.introUnlockTO =
        undefined as any;
  }
}
