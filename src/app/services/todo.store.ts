/**
 * Dette er lagrings- og tilstandshåndteringstjenesten for todo-oppgaver.
 * Den bruker Angular's signal-API for reaktiv tilstandshåndtering.
 */

// -----------------------------
// IMPORTS
// -----------------------------

/**
 * Angular Core imports:
 * - Injectable: Dekoratør for dependency injection
 * - signal: Reaktiv tilstandshåndtering
 * - computed: Beregner avledet tilstand
 */
import { Injectable, signal, computed } from '@angular/core';

/**
 * Modell for todo-oppgaver
 */
import { Task } from '../models/task';

/**
 * TodoStore er hovedtjenesten for håndtering av todo-oppgaver
 * Den er tilgjengelig globalt i applikasjonen (providedIn: 'root')
 */
@Injectable({ providedIn: 'root' })
export class TodoStore {
  // -----------------------------
  // TILSTANDSHÅNDTERING
  // -----------------------------

  /**
   * Privat signal som holder alle oppgaver
   * Initialiseres med data fra localStorage
   */
  private readonly _tasks = signal<Task[]>(this.load());

  /**
   * Offentlige read-only signaler for konsumenter
   */
  readonly tasks = this._tasks.asReadonly();  // Alle oppgaver
  readonly active = computed(() =>            // Aktive (ikke-fullførte) oppgaver
    this._tasks().filter((t) => !t.completed)
  );
  readonly done = computed(() =>              // Fullførte oppgaver
    this._tasks().filter((t) => t.completed)
  );

  // -----------------------------
  // OFFENTLIGE METODER
  // -----------------------------

  /**
   * Legger til en ny oppgave i listen
   * @param task - Oppgaven som skal legges til
   */
  add(task: Task) {
    this._tasks.update((list) => [task, ...list]);  // Legger til først i listen
    this.save();
  }

  /**
   * Toggler fullført-status for en oppgave
   * @param id - ID til oppgaven som skal toggles
   */
  toggle(id: number) {
    this._tasks.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.save();
  }

  /**
   * Fjerner en oppgave fra listen
   * @param id - ID til oppgaven som skal fjernes
   */
  remove(id: number) {
    this._tasks.update((list) => list.filter((t) => t.id !== id));
    this.save();
  }

  /**
   * Fjerner alle fullførte oppgaver
   */
  clearCompleted() {
    this._tasks.update((list) => list.filter((t) => !t.completed));
    this.save();
  }

  // -----------------------------
  // PRIVATE HJELPEMETODER
  // -----------------------------

  /**
   * Laster oppgaver fra localStorage
   * @returns Array av oppgaver, eller tom array hvis ingen data finnes
   */
  private load(): Task[] {
    try {
      return JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    } catch {
      return [];
    }
  }

  /**
   * Lagrer oppgaver til localStorage
   */
  private save() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }
}

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (todo.store.ts) implementerer tilstandshåndtering
 * for todo-oppgaver ved hjelp av Angular's signal-API.
 * 
 * Hovedfunksjoner:
 * 
 * 1. Tilstandshåndtering:
 *    - Holder styr på alle todo-oppgaver
 *    - Bruker signals for reaktiv oppdatering
 *    - Skiller mellom aktive og fullførte oppgaver
 * 
 * 2. Datapersistens:
 *    - Lagrer oppgaver i localStorage
 *    - Laster data ved oppstart
 *    - Automatisk lagring ved endringer
 * 
 * 3. CRUD-operasjoner:
 *    - Legge til nye oppgaver
 *    - Oppdatere oppgavestatus
 *    - Slette oppgaver
 *    - Fjerne fullførte oppgaver
 * 
 * 4. Tilgangskontroll:
 *    - Privat tilstandshåndtering
 *    - Offentlige read-only views
 *    - Kontrollerte oppdateringsmetoder
 * 
 * Dette er en sentral del av applikasjonen som
 * håndterer all logikk relatert til todo-oppgaver.
 */
