# Feilsøking og Løsninger

Dette dokumentet inneholder vanlige problemer og deres løsninger som vi har støtt på under utvikling av ToDo-appen.

## Angular og Tailwind

### Tailwind Kompatibilitet
**Problem:** Tailwind v4 er ikke kompatibel med Angular 18  
**Løsning:** Bruk Tailwind v3.4.0 eller nyere i 3.x-serien
```bash
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

### Styling Problemer
**Problem:** Dropdown/select elementer mangler bakgrunnsfarge  
**Løsning:** Legg til eksplisitt bakgrunnsfarge på select og option elementer
```html
<select class="bg-slate-800">
  <option class="bg-slate-800">Valg 1</option>
</select>
```

## State Management

### LocalStorage med Signals
**Problem:** Problemer med å håndtere localStorage med Angular signals  
**Løsning:** Bruk korrekt signal-syntaks for lesing og skriving
```typescript
// Skriving til localStorage
mySignal.set(newValue);
localStorage.setItem('key', JSON.stringify(newValue));

// Lesing fra localStorage
const storedValue = JSON.parse(localStorage.getItem('key') || 'defaultValue');
mySignal.set(storedValue);
```

## Testing

### Jest Test Oppsett
**Problem:** Jest-konfigurasjon fungerer ikke med Angular-prosjektet  
**Løsning:** Sørg for riktig Jest-konfigurasjon i package.json og jest.config.js
```json
{
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"]
  }
}
```

## Build og Deployment

### Production Build
**Problem:** Production build feiler med optimalisering  
**Løsning:** Sjekk at alle dependencies er korrekt installert og at tsconfig.json er riktig konfigurert
```bash
npm install --production=false
ng build --configuration production
```

## Ytelse

### Lazy Loading
**Problem:** Treg initial lasting av appen  
**Løsning:** Implementer lazy loading for tunge komponenter
```typescript
// I app.routes.ts
{
  path: 'feature',
  loadComponent: () => import('./features/feature/feature.component')
    .then(m => m.FeatureComponent)
}
```

## Debugging Tips

1. Bruk Chrome DevTools Angular-utvidelsen for bedre debugging
2. Sjekk console.log og network tab for nettverksproblemer
3. Verifiser at alle dependencies er kompatible med din Angular-versjon
4. Bruk ng serve med --verbose flagg for detaljert feilsøking
