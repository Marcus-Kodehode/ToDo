/**
 * Dette er hovedkomponenten for todo-funksjonaliteten.
 * Den håndterer visning og interaksjon med todo-listen.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Angular Core-imports
 * - Component: Dekoratør for komponentdefinisjon
 * - computed: For reaktive beregninger
 */
import { Component, computed } from '@angular/core';

/**
 * Angular Common-direktiver for template-funksjonalitet
 * - NgFor: For iterering over lister
 * - NgIf: For betinget rendering
 */
import { NgFor, NgIf } from '@angular/common';

/**
 * Applikasjonskomponenter og tjenester
 */
import { TodoForm } from './components/todo-form/todo-form';
import { TodoStore } from '../../services/todo.store';
import { Task } from '../../models/task';

/**
 * Komponentdekoratør med metadata
 */
@Component({
  selector: 'app-todo',           // HTML-selector for komponenten
  standalone: true,               // Selvstendig komponent
  imports: [NgFor, NgIf, TodoForm], // Nødvendige imports for template
  templateUrl: './todo.html',     // Tilknyttet HTML-template
})
export class Todo {
  // -----------------------------
  // PROPERTIES
  // -----------------------------

  /**
   * Referanse til todo-lagringen
   * Gjøres tilgjengelig for templaten
   */
  store: TodoStore;

  /**
   * Konstruktør - initialiserer todo-lagringen
   * @param todoStore - Injisert todoStore-tjeneste
   */
  constructor(private todoStore: TodoStore) {
    this.store = todoStore;
  }

  // -----------------------------
  // BEREGNEDE VERDIER
  // -----------------------------

  /**
   * Henter aktive (ikke-fullførte) oppgaver
   */
  active = computed(() => this.store.active());

  /**
   * Henter fullførte oppgaver
   */
  done = computed(() => this.store.done());

  /**
   * Beregner fremgangsprosent
   * Viser hvor stor andel av oppgavene som er fullført
   */
  progress = computed(() => {
    const list = this.store.tasks();
    const total = list.length;
    const d = list.filter((t) => t.completed).length;
    return total ? Math.round((d / total) * 100) : 0;
  });

  // -----------------------------
  // HANDLINGSMETODER
  // -----------------------------

  /**
   * Legger til en ny oppgave
   * @param task - Oppgaven som skal legges til
   */
  addTask(task: Task) {
    this.store.add(task);
  }

  /**
   * Toggler fullført-status for en oppgave
   * @param t - Oppgaven som skal toggles
   */
  toggle(t: Task) {
    this.store.toggle(t.id);
  }

  /**
   * Fjerner en oppgave fra listen
   * @param t - Oppgaven som skal fjernes
   */
  remove(t: Task) {
    this.store.remove(t.id);
  }

  /**
   * Fjerner alle fullførte oppgaver
   */
  clearCompleted() {
    this.store.clearCompleted();
  }
}

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (todo.ts) er hovedkomponenten for todo-funksjonaliteten
 * i applikasjonen. Den fungerer som et bindeledd mellom brukergrensesnittet
 * og datalagringen.
 * 
 * Hovedfunksjoner:
 * 
 * 1. Tilstandshåndtering:
 *    - Kobler seg til TodoStore for datalagring
 *    - Håndterer aktive og fullførte oppgaver
 *    - Beregner fremgangsprosent
 * 
 * 2. Brukerinteraksjon:
 *    - Legge til nye oppgaver
 *    - Markere oppgaver som fullført/ikke fullført
 *    - Slette oppgaver
 *    - Rydde opp i fullførte oppgaver
 * 
 * 3. Visningslogikk:
 *    - Separerer aktive og fullførte oppgaver
 *    - Viser fremdrift
 *    - Håndterer template-logikk
 * 
 * Denne komponenten er sentral for:
 * - Oppgaveadministrasjon
 * - Brukerinteraksjon
 * - Visning av todo-status
 */
