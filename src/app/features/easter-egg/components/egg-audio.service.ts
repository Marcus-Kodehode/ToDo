import { Injectable } from '@angular/core';

type Track = 'voice1' | 'voice2' | 'voice3' | 'theme';

@Injectable({ providedIn: 'root' })
export class EggAudioService {
  private files: Record<Track, string> = {
    voice1: '/sounds/saw-voice1.mp3',
    voice2: '/sounds/saw-voice2.mp3', // legg inn når klar
    voice3: '/sounds/saw-voice3.mp3', // legg inn når klar
    theme: '/sounds/saw-theme.mp3', // INTRO THEME (theme1)
  };

  private a: Partial<Record<Track, HTMLAudioElement>> = {};

  constructor() {
    (Object.keys(this.files) as Track[]).forEach((k) => {
      const el = new Audio(this.files[k]);
      el.preload = 'auto';
      this.a[k] = el;
    });

    // baseline volumer
    this.a.voice1!.volume = 1.0;
    if (this.a.voice2) this.a.voice2.volume = 1.0;
    if (this.a.voice3) this.a.voice3.volume = 1.0;

    this.a.theme!.volume = 0.12;
    this.a.theme!.loop = false;
  }

  // ---------- INTRO: voice1 + loopet theme (theme1) ----------
  async playIntroLooped(
    opts: {
      fallbackVoiceMs?: number;
      themeSrc?: string; // override om du vil
      themeVolume?: number; // 0..1
      themeStartDelayMs?: number;
      themeFadeInMs?: number;
      themeFadeOutMs?: number;
    } = {}
  ): Promise<number> {
    const {
      fallbackVoiceMs = 41_000,
      themeSrc,
      themeVolume = 0.2,
      themeStartDelayMs = 500,
      themeFadeInMs = 1000,
      themeFadeOutMs = 1200,
    } = opts;

    this.stopAll();

    await Promise.allSettled([this.whenMeta(this.a.voice1!), this.whenMeta(this.a.theme!)]);

    // Tving theme1 for intro (med mindre themeSrc er eksplisitt satt)
    const theme = this.a.theme!;
    const introSrc = themeSrc ?? this.files.theme; // '/sounds/saw-theme.mp3'
    const wantIntro = new URL(introSrc, window.location.origin).href;
    if (theme.src !== wantIntro) {
      theme.src = introSrc;
      await this.whenMeta(theme);
    }

    const voiceMs =
      isFinite(this.a.voice1!.duration) && this.a.voice1!.duration > 0
        ? Math.floor(this.a.voice1!.duration * 1000)
        : fallbackVoiceMs;

    await this.a.voice1!.play().catch((e) => {
      throw e;
    });

    // Theme i loop, lavt, med fade-in
    setTimeout(() => {
      try {
        theme.loop = true;
        theme.currentTime = 0;
        theme.volume = 0;
        theme
          .play()
          .then(() => this.fadeTo(theme, themeVolume, themeFadeInMs))
          .catch(() => {});
      } catch {}
    }, Math.max(0, themeStartDelayMs));

    // Når voice slutter → fade ut theme + stopp
    const onEnd = () => {
      this.a.voice1!.removeEventListener('ended', onEnd);
      this.fadeTo(theme, 0, themeFadeOutMs);
      setTimeout(() => {
        try {
          theme.pause();
          theme.currentTime = 0;
          theme.loop = false;
        } catch {}
      }, themeFadeOutMs + 50);
    };
    this.a.voice1!.addEventListener('ended', onEnd, { once: true });

    return voiceMs;
  }

  // ---------- LOSE: voice2 + theme2 (ikke loop, lavere enn voice) ----------
  async playLoseWithTheme(
    opts: {
      themeSrc?: string; // f.eks. '/sounds/saw-theme2.mp3'
      themeVolume?: number; // 0..1 (lavt – voice er 1.0)
      themeStartDelayMs?: number; // start x ms etter voice
      themeFadeInMs?: number;
      themeFadeOutMs?: number;
      voiceFallbackMs?: number;
      loopTheme?: boolean; // default false
    } = {}
  ): Promise<number> {
    const {
      themeSrc,
      themeVolume = 0.14,
      themeStartDelayMs = 7500, // ~7.5s etter voice
      themeFadeInMs = 900,
      themeFadeOutMs = 900,
      voiceFallbackMs = 20_000,
      loopTheme = false,
    } = opts;

    this.stopAll();

    const voiceEl = this.a.voice2;
    if (!voiceEl) return voiceFallbackMs;

    await this.whenMeta(voiceEl);

    const theme = this.a.theme!;
    if (themeSrc) {
      const wantLose = new URL(themeSrc, window.location.origin).href;
      if (theme.src !== wantLose) {
        theme.src = themeSrc;
        await this.whenMeta(theme);
      }
    }

    // Volumprioritet
    voiceEl.volume = 1.0;
    theme.volume = 0.0;
    theme.loop = loopTheme; // normalt false her

    const voiceMs =
      isFinite(voiceEl.duration) && voiceEl.duration > 0
        ? Math.floor(voiceEl.duration * 1000)
        : voiceFallbackMs;

    await voiceEl.play().catch(() => {});

    // Start theme etter delay (ikke loop)
    setTimeout(() => {
      try {
        theme.currentTime = 0;
        theme
          .play()
          .then(() => this.fadeTo(theme, themeVolume, themeFadeInMs))
          .catch(() => {});
      } catch {}
    }, Math.max(0, themeStartDelayMs));

    // Når voice slutter → fade ut theme + stopp
    const onEnd = () => {
      voiceEl.removeEventListener('ended', onEnd);
      this.fadeTo(theme, 0, themeFadeOutMs);
      setTimeout(() => {
        try {
          theme.pause();
          theme.currentTime = 0;
          theme.loop = false;
        } catch {}
      }, themeFadeOutMs + 50);
    };
    voiceEl.addEventListener('ended', onEnd, { once: true });

    return voiceMs;
  }

  // ---------- WIN: voice3 + theme2 synket til å SLUTTE likt ----------
  async playWinWithThemeSynced(
    opts: {
      themeSrc?: string; // default '/sounds/saw-theme2.mp3'
      themeVolume?: number; // 0..1 (samme som lose)
      themeFadeInMs?: number;
      themeFadeOutMs?: number;
      tailGapMs?: number; // hvor mye tidligere theme skal dø enn voice (0 = likt)
      fallbackVoiceMs?: number; // bruk hvis metadata mangler
      fallbackThemeMs?: number;
    } = {}
  ): Promise<number> {
    const {
      themeSrc = '/sounds/saw-theme2.mp3',
      themeVolume = 0.14, // samme som lose
      themeFadeInMs = 900,
      themeFadeOutMs = 900,
      tailGapMs = 0, // slutt samtidig
      fallbackVoiceMs = 23_000, // du sa voice3 ~23s
      fallbackThemeMs = 18_000, // theme2 ~18s
    } = opts;

    this.stopAll();

    const voiceEl = this.a.voice3;
    if (!voiceEl) return fallbackVoiceMs;

    // Metadata for voice og theme (så vi får eksakte tider)
    await this.whenMeta(voiceEl);

    const theme = this.a.theme!;
    const want = new URL(themeSrc, window.location.origin).href;
    if (theme.src !== want) {
      theme.src = themeSrc;
      await this.whenMeta(theme);
    } else {
      await this.whenMeta(theme);
    }

    const voiceMs =
      isFinite(voiceEl.duration) && voiceEl.duration > 0
        ? Math.floor(voiceEl.duration * 1000)
        : fallbackVoiceMs;

    const themeMs =
      isFinite(theme.duration) && theme.duration > 0
        ? Math.floor(theme.duration * 1000)
        : fallbackThemeMs;

    // Beregn offset så theme ender samtidig som voice (minus tailGap)
    const offsetMs = Math.max(0, voiceMs - themeMs - tailGapMs);

    // Volum
    voiceEl.volume = 1.0;
    theme.volume = 0;
    theme.loop = false;

    // Start voice nå
    await voiceEl.play().catch(() => {});

    // Start theme etter beregnet offset
    setTimeout(() => {
      try {
        theme.currentTime = 0;
        theme
          .play()
          .then(() => this.fadeTo(theme, themeVolume, themeFadeInMs))
          .catch(() => {});
      } catch {}
    }, offsetMs);

    // Når voice slutter → fade ut theme (hvis temaet fortsatt spiller)
    const onEnd = () => {
      voiceEl.removeEventListener('ended', onEnd);
      this.fadeTo(theme, 0, themeFadeOutMs);
      setTimeout(() => {
        try {
          theme.pause();
          theme.currentTime = 0;
        } catch {}
      }, themeFadeOutMs + 50);
    };
    voiceEl.addEventListener('ended', onEnd, { once: true });

    return voiceMs;
  }

  // ---------- Enkeltspor ----------
  async playVoice(track: 'voice2' | 'voice3', fallbackMs = 20_000): Promise<number> {
    const el = this.a[track];
    if (!el) return fallbackMs;
    this.stopAll();
    await this.whenMeta(el);
    const durMs =
      isFinite(el.duration) && el.duration > 0 ? Math.floor(el.duration * 1000) : fallbackMs;
    await el.play().catch(() => {});
    return durMs;
  }

  stopAll() {
    (Object.values(this.a) as HTMLAudioElement[]).forEach((el) => {
      if (!el) return;
      el.pause();
      el.currentTime = 0;
      if (el === this.a.theme) (el as HTMLAudioElement).loop = false;
    });
  }

  private whenMeta(a: HTMLAudioElement): Promise<void> {
    return new Promise((res) => {
      if (a.readyState >= 1 && isFinite(a.duration) && a.duration > 0) return res();
      a.addEventListener('loadedmetadata', () => res(), { once: true });
      a.load();
    });
  }

  private fadeTo(el: HTMLAudioElement, to: number, ms: number) {
    if (!el) return;
    const from = el.volume;
    const steps = Math.max(1, Math.floor(ms / 30));
    let i = 0;
    const id = setInterval(() => {
      i++;
      el.volume = from + (to - from) * (i / steps);
      if (i >= steps) clearInterval(id);
    }, 30);
  }
}
