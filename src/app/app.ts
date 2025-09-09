/**
 * Dette er hovedkomponenten for Todo-applikasjonen.
 * Den fungerer som rot-komponenten og styrer navigasjon mellom ulike visninger.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Angular Core-imports
 * Component: Dekoratør for å definere komponenten
 * signal: Reaktiv tilstandshåndtering
 */
import { Component, signal } from '@angular/core';

/**
 * Angular Common-imports
 * NgIf: Betinget rendering
 * NgSwitch: Dynamisk visningshåndtering
 */
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

/**
 * Feature-komponenter
 * Importerer alle hovedkomponenter som brukes i applikasjonen
 */
import { Start } from './features/start/start';
import { Todo } from './features/todo/todo';
import { Calculator } from './features/calculator/calculator';
import { EasterEgg } from './features/easter-egg/easter-egg';
import { Header } from './features/shared/header/header';
import { Footer } from './features/shared/footer/footer';

/**
 * Hovedkomponent-dekoratør
 * Definerer metadata for komponenten
 */
@Component({
  selector: 'app-root',         // HTML-selector for komponenten
  standalone: true,             // Selvstendig komponent (ny Angular-funksjonalitet)
  imports: [                    // Nødvendige imports for template
    NgIf, 
    NgSwitch, 
    NgSwitchCase, 
    Start, 
    Todo, 
    Calculator, 
    EasterEgg, 
    Header, 
    Footer
  ],
  templateUrl: './app.html',    // Kobling til HTML-template
})
export class App {
  // -----------------------------
  // TILSTANDSHÅNDTERING
  // -----------------------------

  /**
   * Signal for hovedvisning ('start', 'main', eller 'easter-egg')
   * Styrer hvilken hovedvisning som vises til brukeren
   */
  currentView = signal<'start' | 'main' | 'easter-egg'>('start');

  /**
   * Signal for undervisning i hovedvisningen ('todo' eller 'calculator')
   * Styrer hvilken funksjonalitet som vises når man er i hovedvisningen
   */
  mainView = signal<'todo' | 'calculator'>('todo');

  /**
   * Signal for brukerens navn
   * Lagrer og håndterer brukerens navn gjennom applikasjonen
   */
  userName = signal<string>('');

  /**
   * Metode for å bytte mellom todo og kalkulator
   * @param view - Navnet på visningen som skal aktiveres
   */
  setMainView(view: string) {
    this.mainView.set(view as 'todo' | 'calculator');
  }

  // -----------------------------
  // LIVSSYKLUS OG INITIALISERING
  // -----------------------------

  /**
   * Constructor - kjører når komponenten opprettes
   * Setter opp initial tilstand og event listeners
   */
  constructor() {
    this.checkUserStatus();
    window.addEventListener('name-saved', () => this.checkUserStatus());
  }

  /**
   * Privat metode for å sjekke og oppdatere brukerens status
   * Håndterer navigasjon basert på brukerdata i localStorage
   */
  private checkUserStatus() {
    const name = localStorage.getItem('app_name');
    const isEasterEgg = localStorage.getItem('egg_enabled') === '1';

    if (!name) {
      this.currentView.set('start');
    } else if (isEasterEgg) {
      this.currentView.set('easter-egg');
      this.userName.set(name);
    } else {
      this.currentView.set('main');
      this.userName.set(name);
    }
  }
}

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (app.ts) er hovedkomponenten i Angular-applikasjonen.
 * Den har følgende hovedoppgaver:
 * 
 * 1. Routing og Navigasjon:
 *    - Håndterer switching mellom ulike visninger (start, main, easter-egg)
 *    - Kontrollerer undervisninger i hovedvisningen (todo, calculator)
 * 
 * 2. Tilstandshåndtering:
 *    - Holder styr på brukerens navn
 *    - Håndterer applikasjonens hovedtilstand
 *    - Bruker Angular signals for reaktiv tilstandsoppdatering
 * 
 * 3. Brukerdata:
 *    - Sjekker og håndterer brukerens påloggingsstatus
 *    - Lagrer og henter brukerdata fra localStorage
 * 
 * 4. Komponentstruktur:
 *    - Fungerer som container for alle andre komponenter
 *    - Importerer og organiserer nødvendige underkomponenter
 * 
 * Dette er "hjernen" i applikasjonen som styrer
 * overordnet flyt og funksjonalitet.
 */
