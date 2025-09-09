/**
 * Dette er test-filen for App-komponenten.
 * Den inneholder enhetstester for å verifisere at hovedkomponenten fungerer som forventet.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Angular Core-imports
 * provideZonelessChangeDetection: Muliggjør testing uten Zone.js
 */
import { provideZonelessChangeDetection } from '@angular/core';

/**
 * Testing-verktøy fra Angular
 * TestBed: Hovedverktøyet for komponenttesting
 */
import { TestBed } from '@angular/core/testing';

/**
 * Hovedkomponenten som skal testes
 */
import { App } from './app';

// -----------------------------
// TESTSUITE
// -----------------------------

/**
 * Hovedtestsuite for App-komponenten
 * Inneholder alle tester relatert til App-komponenten
 */
describe('App', () => {
  /**
   * Oppsett som kjøres før hver test
   * Konfigurerer testmiljøet og kompilerer komponenten
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],  // Importerer hovedkomponenten
      providers: [provideZonelessChangeDetection()]  // Setter opp zoneless testing
    }).compileComponents();
  });

  /**
   * Test 1: Verifiserer at komponenten kan opprettes
   * Sjekker at komponenten instansieres riktig
   */
  it('should create the app', () => {
    // Oppretter en test-instans av komponenten
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    // Verifiserer at komponenten eksisterer
    expect(app).toBeTruthy();
  });

  /**
   * Test 2: Sjekker rendering av tittel
   * Verifiserer at komponenten rendrer riktig innhold
   */
  it('should render title', () => {
    // Oppretter og oppdaterer komponenten
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    
    // Henter det rendrede DOM-elementet
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Sjekker at tittelen inneholder forventet tekst
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, todo');
  });
});

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (app.spec.ts) er test-suiten for hovedkomponenten i applikasjonen.
 * Den har følgende hovedoppgaver:
 * 
 * 1. Test Oppsett:
 *    - Konfigurerer testmiljøet med TestBed
 *    - Setter opp nødvendige imports og providers
 *    - Forbereder komponenten for testing
 * 
 * 2. Komponenttesting:
 *    - Verifiserer at komponenten kan opprettes
 *    - Sjekker at komponenten rendrer riktig
 *    - Tester grunnleggende funksjonalitet
 * 
 * 3. DOM-testing:
 *    - Sjekker at riktig innhold vises i browseren
 *    - Verifiserer HTML-strukturen
 * 
 * 4. Testdekning:
 *    - Sikrer at grunnleggende funksjonalitet er testet
 *    - Gir et utgangspunkt for videre testing
 * 
 * Dette er en viktig del av kvalitetssikringen som:
 * - Validerer at komponenten fungerer som forventet
 * - Fanger opp potensielle feil tidlig
 * - Dokumenterer forventet oppførsel
 * - Forenkler vedlikehold og refaktorering
 */
