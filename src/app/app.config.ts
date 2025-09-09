/**
 * Dette er konfigurasjonsfilen for Angular-applikasjonen.
 * Den definerer globale innstillinger og tjenester som skal være tilgjengelige i hele appen.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Importerer nødvendige konfigurasjonstyper og providere fra Angular Core:
 * - ApplicationConfig: Type for app-konfigurasjon
 * - provideBrowserGlobalErrorListeners: Håndterer globale feil i nettleseren
 * - provideZonelessChangeDetection: Muliggjør zoneless change detection for bedre ytelse
 */
import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection 
} from '@angular/core';

// -----------------------------
// APP KONFIGURASJON
// -----------------------------

/**
 * Hovedkonfigurasjon for applikasjonen
 * Eksporteres for bruk i bootstrap-prosessen
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Setter opp global feilhåndtering for nettleseren
    provideBrowserGlobalErrorListeners(),
    
    // Aktiverer zoneless change detection for bedre ytelse
    provideZonelessChangeDetection(),
  ]
};

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (app.config.ts) er ansvarlig for den globale konfigurasjonen
 * av Angular-applikasjonen. Den har følgende hovedoppgaver:
 * 
 * 1. Dependency Injection Setup:
 *    - Definerer globale tjenester (providers)
 *    - Konfigurerer hvordan tjenester skal instansieres
 *    - Setter opp dependency injection hierarkiet
 * 
 * 2. Feilhåndtering:
 *    - Konfigurerer global feilhåndtering
 *    - Setter opp lyttere for nettleser-spesifikke feil
 *    - Muliggjør konsistent feilhåndtering på tvers av appen
 * 
 * 3. Ytelsesforbedringer:
 *    - Aktiverer zoneless change detection
 *    - Optimaliserer hvordan Angular oppdager endringer
 *    - Forbedrer applikasjonens ytelse
 * 
 * Dette er en kritisk fil som påvirker:
 * - Applikasjonens grunnleggende oppførsel
 * - Ytelse og optimalisering
 * - Feilhåndtering og debugging
 * - Dependency injection system
 */
