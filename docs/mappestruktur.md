# ToDo App - Mappestruktur

Dette dokumentet gir en oversikt over mappestrukturen i ToDo-applikasjonen, med forklaringer på hver mappes formål og innhold.

## Prosjektstruktur

```
├── docs/                       # Dokumentasjon
│   ├── angular-setup.md       # Angular oppsettguide
│   └── mappestruktur.md      # Dette dokumentet
│
├── public/                    # Statiske filer
│   ├── favicon.ico           # Nettleserfane-ikon
│   └── images/               # Bilder og ikoner
│       └── icons/            # App-ikoner
│           ├── discord.png   
│           ├── github.png
│           ├── instagram.png
│           └── ToDo-logo.png
│
├── src/                      # Kildekode
│   ├── app/                  # Applikasjonskode
│   │   ├── features/        # Hovedfunksjoner
│   │   │   ├── calculator/  # Kalkulator-komponent
│   │   │   │   ├── calculator.html
│   │   │   │   ├── calculator.ts
│   │   │   │   └── components/
│   │   │   │
│   │   │   ├── easter-egg/  # Easter egg-funksjonalitet
│   │   │   │   ├── easter-egg.html
│   │   │   │   ├── easter-egg.ts
│   │   │   │   └── components/
│   │   │   │
│   │   │   ├── shared/      # Delte komponenter
│   │   │   │   ├── components/
│   │   │   │   ├── footer/  # Bunntekst
│   │   │   │   │   ├── footer.html
│   │   │   │   │   └── footer.ts
│   │   │   │   └── header/  # Topptekst
│   │   │   │       ├── header.html
│   │   │   │       └── header.ts
│   │   │   │
│   │   │   ├── start/       # Startside
│   │   │   │   ├── start.html
│   │   │   │   ├── start.ts
│   │   │   │   └── components/
│   │   │   │
│   │   │   └── todo/        # ToDo-funksjonalitet
│   │   │       ├── todo.html
│   │   │       ├── todo.ts
│   │   │       └── components/
│   │   │           └── todo-form/
│   │   │               ├── todo-form.html
│   │   │               └── todo-form.ts
│   │   │
│   │   ├── models/          # Datamodeller
│   │   │   └── task.ts      # ToDo-oppgave modell
│   │   │
│   │   ├── services/        # Tjenester
│   │   │   └── todo.store.ts # ToDo tilstandshåndtering
│   │   │
│   │   ├── app.config.ts    # App-konfigurasjon
│   │   ├── app.css         # Hoved-CSS
│   │   ├── app.html        # Hoved-template
│   │   ├── app.spec.ts     # App-tester
│   │   └── app.ts          # Hoved-app komponent
│   │
│   ├── index.html           # Hoved HTML-fil
│   ├── main.ts             # App oppstartspunkt
│   └── styles.css          # Globale stiler
│
├── angular.json             # Angular konfigurasjon
├── package.json            # Prosjektavhengigheter
├── README.md               # Prosjektdokumentasjon
├── tailwind.config.js      # Tailwind CSS konfig
├── tsconfig.app.json       # TypeScript app-konfig
├── tsconfig.json           # TypeScript basis-konfig
└── tsconfig.spec.json      # TypeScript test-konfig
```

## Hovedmapper og Filer

### `/docs`
Inneholder prosjektdokumentasjon, inkludert oppsettsguider og strukturoversikt.

### `/public`
Statiske ressurser som bilder, ikoner og andre medier.

### `/src/app/features`
Inneholder hovedfunksjonaliteten i appen, organisert i separate moduler:
- **calculator**: Kalkulatorfunksjonalitet
- **easter-egg**: Skjult påskeegg-funksjon
- **shared**: Gjenbrukbare komponenter (header, footer)
- **start**: Velkomstside
- **todo**: Hovedfunksjonalitet for oppgavehåndtering

### `/src/app/models`
Definerer datastrukturer og interfaces for appen.

### `/src/app/services`
Inneholder tjenester for tilstandshåndtering og forretningslogikk.

## Kjernefiler

- **app.config.ts**: Konfigurasjon for Angular-appen
- **main.ts**: Bootstrapping av applikasjonen
- **styles.css**: Globale stildefinisjoner
- **tailwind.config.js**: Tilpasning av Tailwind CSS
- **angular.json**: Angular CLI konfigurasjon

## Utviklingsverktøy

Prosjektet bruker følgende hovedteknologier:
- Angular (siste versjon)
- TypeScript
- Tailwind CSS
- Jest for testing