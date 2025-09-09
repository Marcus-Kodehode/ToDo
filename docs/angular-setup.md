# Angular Prosjekt Oppsettguide

Denne guiden forklarer hvordan du setter opp et nytt Angular-prosjekt med Tailwind CSS, basert på oppsettet brukt i ToDo-appen.

## Forutsetninger
- Node.js installert (LTS-versjon anbefales)
- npm (følger med Node.js)
- En kodeteksteditor (VS Code anbefales)

## Steg-for-Steg Oppsett

### 1. Installer Angular CLI
```bash
npm install -g @angular/cli
```

### 2. Opprett Nytt Prosjekt
```bash
# Opprett prosjekt med standalone-komponenter
ng new prosjektnavn --standalone --routing=false --style=css

# Naviger til prosjektmappen
cd prosjektnavn
```

**Valg under opprettelse:**
- `--standalone`: Bruker standalone-komponenter (anbefalt)
- `--routing=false`: Starter uten routing (kan legges til senere)
- `--style=css`: Bruker vanlig CSS (Tailwind legges til senere)

### 3. Installer og Konfigurer Tailwind CSS
```bash
# Installer Tailwind og nødvendige verktøy
# VIKTIG: Bruk Tailwind v3 for Angular 18 kompatibilitet
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# Initialiser Tailwind
npx tailwindcss init
```

### 4. Konfigurer Tailwind
Oppdater `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Skann alle HTML og TS filer
  ],
  theme: {
    extend: {},  // Legg til egendefinerte tema-innstillinger her
  },
  plugins: [],
}
```

### 5. Sett Opp CSS
Oppdater `src/styles.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Egendefinerte globale stiler kan legges til her */
```

### 6. Prosjektstruktur
Opprett følgende mappestruktur:
```
src/
└── app/
    ├── features/      # Funksjonalitetsmoduler
    │   └── shared/    # Delte komponenter
    ├── models/        # Datamodeller/interfaces
    └── services/      # Tjenester og tilstandshåndtering
```

```bash
# Opprett hovedmapper
mkdir -p src/app/features/shared
mkdir -p src/app/models
mkdir -p src/app/services
```

### 7. Utviklingsserver og Testing
```bash
# Start utviklingsserver
ng serve

# Kjør tester
ng test

# Bygg for produksjon
ng build --configuration production
```

## Beste Praksis

### Komponentstruktur
```typescript
// Eksempel på komponentoppsett
import { Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [], // Liste over nødvendige imports
  templateUrl: './feature.html',
})
export class FeatureComponent {
  // Komponentlogikk her
}
```

### Signals for Tilstandshåndtering
```typescript
// Eksempel på bruk av signals
import { signal } from '@angular/core';

export class MyComponent {
  count = signal(0);
  
  increment() {
    this.count.update(n => n + 1);
  }
}
```

## VS Code Anbefalinger

### Anbefalte Utvidelser
- Angular Language Service
- Tailwind CSS IntelliSense
- ESLint
- Prettier

### Workspace Settings
Legg til i `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Scripts og Kommandoer
Legg til i `package.json`:
```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch",
    "test": "ng test"
  }
}
```

## Neste Steg
- Se [troubleshooting.md](./troubleshooting.md) for vanlige problemer og løsninger
- Se [future-improvements.md](./future-improvements.md) for fremtidige forbedringer
- Sjekk ut [mappestruktur.md](./mappestruktur.md) for detaljert prosjektstruktur