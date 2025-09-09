# Angular Prosjekt Setup Guide

## Opprettelse av nytt prosjekt
```bash
npm install -g @angular/cli
ng new prosjektnavn --standalone --routing=false --style=css
cd prosjektnavn

# VIKTIG: Bruk Tailwind v3, IKKE v4 (kompatibilitetsproblemer med Angular 18)
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init

# Konfigurer tailwind.config.js:
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [],
}

# Oppdater styles.css:
@tailwind base;
@tailwind components;
@tailwind utilities;








# Kjente problemer og løsninger
Problem 1: Tailwind v4 fungerer ikke med Angular 18
Løsning: Bruk Tailwind v3 (se installasjon over)

Problem 2: Dropdown/select elementer mangler bakgrunn
Løsning: Legg til eksplisitt bg-slate-800 eller lignende på select og option elementer

Problem 3: localStorage med signals
Løsning: Bruk signal.set() og signal() for å lese/skrive


# Notater

OAuth 2.0 / OpenID Connect fremfor Clerk?
Sequel