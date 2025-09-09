/**
 * Dette er hovedfilen for Angular-applikasjonen.
 * Den er ansvarlig for å starte opp applikasjonen og sette opp det grunnleggende rammeverket.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Zone.js er et bibliotek som hjelper Angular med å oppdage endringer i applikasjonen.
 * Dette må importeres først for at Angular skal fungere riktig.
 */
import 'zone.js';

/**
 * bootstrapApplication er hovedfunksjonen som starter Angular-applikasjonen.
 * Den kommer fra @angular/platform-browser som håndterer nettleser-spesifikk funksjonalitet.
 */
import { bootstrapApplication } from '@angular/platform-browser';

/**
 * Importerer hovedkomponenten (App) som er rot-komponenten for applikasjonen.
 * Denne inneholder strukturen for hele applikasjonen.
 */
import { App } from './app/app';

// -----------------------------
// APPLIKASJONSSTART
// -----------------------------

/**
 * Starter applikasjonen med App-komponenten som rot.
 * catch-blokken fanger opp eventuelle feil under oppstart og logger dem til konsollen.
 */
bootstrapApplication(App).catch((err) => console.error(err));

// -----------------------------
// FILBESKRIVELSE
// -----------------------------

/**
 * Denne filen (main.ts) er inngangsportalen til Angular-applikasjonen.
 * Den har følgende hovedoppgaver:
 * 
 * 1. Laster inn nødvendige avhengigheter (som zone.js)
 * 2. Importerer hovedkomponenten og oppstartsmekanismen
 * 3. Starter applikasjonen med riktig konfigurasjon
 * 4. Håndterer eventuelle oppstartsfeil
 * 
 * Dette er det første punktet Angular ser på når applikasjonen starter,
 * og den setter i gang resten av applikasjonslogikken.
 */
