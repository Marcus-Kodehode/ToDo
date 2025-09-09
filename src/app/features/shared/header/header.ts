/**
 * Dette er header-komponenten som viser navigasjon og brukerinfo
 * øverst i applikasjonen når brukeren er logget inn.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Angular Core-imports for komponentfunksjonalitet:
 * - Component: For komponentdekorasjon
 * - Input: For å motta data fra foreldre-komponent
 * - Output/EventEmitter: For å sende hendelser til foreldre
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Komponentdekoratør med metadata og inline-template
 */
@Component({
  selector: 'app-header',        // HTML-selector for komponenten
  standalone: true,              // Selvstendig komponent
  template: `
    <!-- 
      HEADER-CONTAINER 
      Semi-transparent bakgrunn med blur-effekt
    -->
    <div class="p-4 bg-black/20 backdrop-blur-sm">
      <!-- 
        INNHOLD-CONTAINER
        Maksbredde og flex-layout for plassering av elementer
      -->
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <!-- Velkomstmelding med brukernavn -->
        <h1 class="text-2xl font-bold">Hei, {{ userName }}! 👋</h1>
        
        <!-- 
          NAVIGASJONSKNAPPER
          Bytter mellom planlegger og kalkulator
        -->
        <div class="flex gap-2">
          <!-- Planlegger-knapp -->
          <button 
            (click)="viewChange.emit('todo')"
            [class.bg-emerald-500]="activeView === 'todo'"
            [class.bg-white/10]="activeView !== 'todo'"
            class="px-4 py-2 rounded-lg transition"
          >
            📝 Planlegger
          </button>
          
          <!-- Kalkulator-knapp -->
          <button 
            (click)="viewChange.emit('calculator')"
            [class.bg-emerald-500]="activeView === 'calculator'"
            [class.bg-white/10]="activeView !== 'calculator'"
            class="px-4 py-2 rounded-lg transition"
          >
            🧮 Kalkulator
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Header {
  // -----------------------------
  // INPUTS & OUTPUTS
  // -----------------------------

  /**
   * Brukernavnet som vises i headeren
   * Mottas fra foreldre-komponenten
   */
  @Input() userName: string = '';

  /**
   * Hvilken visning som er aktiv (todo/calculator)
   * Brukes for å style aktiv knapp
   */
  @Input() activeView: string = '';

  /**
   * Event emitter for når bruker bytter visning
   * Sender 'todo' eller 'calculator' til foreldre
   */
  @Output() viewChange = new EventEmitter<string>();
}

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (header.ts) implementerer header-komponenten
 * som vises øverst i applikasjonen etter innlogging.
 * 
 * Hovedfunksjoner:
 * 
 * 1. Brukeridentifikasjon:
 *    - Viser personlig velkomstmelding
 *    - Integrerer brukernavnet i UI
 * 
 * 2. Navigasjon:
 *    - Bytter mellom planlegger og kalkulator
 *    - Visuell indikasjon av aktiv visning
 *    - Sømløs overgang mellom funksjoner
 * 
 * 3. Visuelt Design:
 *    - Moderne glassmorfisme-effekt
 *    - Responsivt layout
 *    - Intuitiv navigasjon
 * 
 * 4. Komponentkommunikasjon:
 *    - Mottar brukerdata via Input
 *    - Sender navigasjonshendelser via Output
 *    - Toveiskommunikasjon med foreldre
 * 
 * Dette er en kritisk komponent for:
 * - Brukeropplevelse
 * - Navigasjon
 * - Visuell identitet
 */
