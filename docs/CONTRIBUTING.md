# Bidragsguide

Takk for at du vurderer å bidra til ToDo-applikasjonen! Dette dokumentet gir retningslinjer for hvordan du kan bidra til prosjektet.

## 🤝 Hvordan Bidra

### 1. Fork og Clone
1. Fork dette repositoryet
2. Clone din fork:
   ```bash
   git clone https://github.com/ditt-brukernavn/ToDo.git
   ```
3. Legg til upstream remote:
   ```bash
   git remote add upstream https://github.com/Marcus-Kodehode/ToDo.git
   ```

### 2. Sett Opp Utviklingsmiljø
1. Installer avhengigheter:
   ```bash
   npm install
   ```
2. Start utviklingsserver:
   ```bash
   npm start
   ```

### 3. Lag en Branch
```bash
git checkout -b feature/min-nye-funksjon
```

Bruk beskrivende branch-navn:
- `feature/` for nye funksjoner
- `fix/` for feilrettinger
- `docs/` for dokumentasjonsendringer
- `refactor/` for koderefaktorering

### 4. Kodestandard

#### Generelle Regler
- Bruk TypeScript
- Følg Angular style guide
- Skriv lesbar kode med gode kommentarer
- Hold komponenter små og fokuserte

#### Format og Linting
- Bruk Prettier for formatering
- Følg ESLint-regler
- Kjør linting før commit:
  ```bash
  npm run lint
  ```

#### Testing
- Skriv tester for ny funksjonalitet
- Oppdater eksisterende tester ved behov
- Kjør tester før commit:
  ```bash
  npm test
  ```

### 5. Commit-Meldinger
Følg denne strukturen:
```
type(scope): kort beskrivelse

Detaljert forklaring hvis nødvendig
```

Types:
- `feat`: Ny funksjonalitet
- `fix`: Feilretting
- `docs`: Dokumentasjonsendringer
- `style`: Formatering, manglende semikolon osv.
- `refactor`: Koderefaktorering
- `test`: Legge til eller endre tester
- `chore`: Oppdateringer som ikke endrer koden

Eksempel:
```
feat(todo): legg til støtte for gjentakende oppgaver

- Implementer ukentlig gjentakelse
- Legg til UI for gjentakelsesinnstillinger
- Oppdater lagring for å håndtere gjentakelse
```

### 6. Pull Request
1. Push endringene til din fork:
   ```bash
   git push origin feature/min-nye-funksjon
   ```
2. Gå til GitHub og opprett en Pull Request
3. Fyll ut PR-malen:
   - Beskriv endringene
   - Referer til eventuelle issues
   - Legg ved skjermbilder hvis relevant
   - Merk hvis det krever databaseendringer

### 7. Review Prosess
- Adresser eventuelle kommentarer
- Hold PR-en oppdatert med main
- Vær tålmodig og høflig i diskusjoner

## 🐛 Rapportere Bugs

### Bug Reports
Inkluder:
1. Tydelig beskrivelse av problemet
2. Steg for å reprodusere
3. Forventet vs. faktisk oppførsel
4. Skjermbilder hvis relevant
5. Nettleser og versjonsinformasjon

### Feature Requests
Inkluder:
1. Tydelig beskrivelse av funksjonen
2. Bruksscenarier
3. Forventet oppførsel
4. Mockups/skisser hvis relevant

## 📝 Stilguide

### TypeScript
```typescript
// Bruk interface for datamodeller
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Bruk beskrivende variabelnavn
const incompleteTasks = tasks.filter(task => !task.completed);

// Dokumenter kompleks logikk
/**
 * Filtrerer og sorterer oppgaver basert på status og dato
 * @param tasks Liste over oppgaver
 * @returns Sortert liste over aktive oppgaver
 */
function getActiveTasks(tasks: Task[]): Task[] {
  // Implementation
}
```

### HTML
```html
<!-- Bruk semantiske elementer -->
<main>
  <section class="task-list">
    <h2>Mine Oppgaver</h2>
    <article *ngFor="let task of tasks">
      <!-- Task content -->
    </article>
  </section>
</main>

<!-- Bruk aria-labels for tilgjengelighet -->
<button 
  aria-label="Slett oppgave"
  (click)="deleteTask(task)">
  🗑️
</button>
```

### CSS/Tailwind
```html
<!-- Grupper relaterte klasser -->
<div class="flex items-center justify-between
            p-4 rounded-lg
            bg-white/10 backdrop-blur-sm">
  <!-- Content -->
</div>
```

## 🙏 Takk for Bidraget!

Ditt bidrag hjelper med å gjøre ToDo-appen bedre for alle brukere. Hvis du har spørsmål, ikke nøl med å spørre i issues eller diskusjoner.
