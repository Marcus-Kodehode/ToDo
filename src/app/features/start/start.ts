/**
 * Dette er startskjerm-komponenten som håndterer brukerregistrering
 * og easter egg-funksjonalitet i applikasjonen.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Angular Core-imports
 * - Component: For komponentdekorasjon
 * - signal: For reaktiv tilstandshåndtering
 */
import { Component, signal } from '@angular/core';

/**
 * Forms-modulen for å håndtere input og forms
 */
import { FormsModule } from '@angular/forms';

// -----------------------------
// KONSTANTER
// -----------------------------

/**
 * Nøkkel for brukernavnet i localStorage
 */
const NAME_KEY = 'app_name';

/**
 * Easter egg trigger-navn
 * Når dette navnet skrives inn, aktiveres en hemmelig funksjon
 */
const EGG_NAME = 'joakim';

/**
 * Komponentdekoratør med metadata
 */
@Component({
  selector: 'app-start',          // HTML-selector for komponenten
  standalone: true,               // Selvstendig komponent
  imports: [FormsModule],         // Nødvendige imports for forms
  templateUrl: './start.html',    // Tilknyttet HTML-template
})
export class Start {
  // -----------------------------
  // TILSTANDSHÅNDTERING
  // -----------------------------

  /**
   * Signal for brukernavnet
   * Initialiseres med eksisterende navn fra localStorage eller tom streng
   */
  name = signal<string>(localStorage.getItem(NAME_KEY) ?? '');

  // -----------------------------
  // METODER
  // -----------------------------

  /**
   * Lagrer brukernavnet og håndterer easter egg-logikk
   * Denne metoden:
   * 1. Trimmer og validerer navnet
   * 2. Lagrer navnet i localStorage
   * 3. Sjekker for easter egg-aktivering
   * 4. Varsler app om at navn er lagret
   */
  save() {
    // Trim og valider navnet
    const n = this.name().trim();
    if (!n) return;

    // Lagre navnet
    localStorage.setItem(NAME_KEY, n);

    // Håndter easter egg-logikk
    if (n.toLowerCase() === EGG_NAME) {
      localStorage.setItem('egg_enabled', '1');
    } else {
      localStorage.removeItem('egg_enabled');
    }

    // Varsle om navneendring
    dispatchEvent(new CustomEvent('name-saved'));
  }
}

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (start.ts) implementerer startskjermen i applikasjonen.
 * Den har følgende hovedoppgaver:
 * 
 * 1. Brukerregistrering:
 *    - Tar imot og lagrer brukernavn
 *    - Validerer input
 *    - Persisterer data i localStorage
 * 
 * 2. Easter Egg:
 *    - Implementerer hemmelig funksjonalitet
 *    - Aktiveres ved spesifikt brukernavn
 *    - Håndterer tilstandsendring for easter egg
 * 
 * 3. Navigasjon:
 *    - Varsler hovedappen om brukerregistrering
 *    - Muliggjør overgang til hovedvisning
 * 
 * 4. Tilstandshåndtering:
 *    - Bruker Angular signals for reaktivitet
 *    - Integrerer med localStorage
 *    - Håndterer komponentsyklus
 * 
 * Dette er første skjermen brukeren møter,
 * og den er kritisk for brukeropplevelsen.
 */
