/**
 * Dette er grensesnittet som definerer strukturen for en todo-oppgave.
 * Det beskriver alle egenskaper en oppgave kan ha i systemet.
 */

export interface Task {
  // -----------------------------
  // PÅKREVDE FELTER
  // -----------------------------

  /**
   * Unik identifikator for oppgaven
   * Brukes for å skille mellom oppgaver og muliggjøre oppdateringer
   */
  id: number;

  /**
   * Hovedteksten/beskrivelsen av oppgaven
   * Dette er det som vises i todo-listen
   */
  text: string;

  /**
   * Indikerer om oppgaven er fullført
   * Styrer visning og filtrering av oppgaver
   */
  completed: boolean;

  // -----------------------------
  // VALGFRIE FELTER
  // -----------------------------

  /**
   * Dato når oppgaven skal være ferdig
   * Format: 'YYYY-MM-DD'
   */
  dueDate?: string;

  /**
   * Tidspunkt når oppgaven skal være ferdig
   * Format: 'HH:MM'
   */
  dueTime?: string;

  /**
   * Kategori for oppgaven
   * Mulige verdier: 'WORK', 'HOME', 'SCHOOL', 'TRAINING', 'HEALTH'
   */
  category?: string;

  /**
   * Prioritetsnivå for oppgaven
   * Mulige verdier: 'high', 'medium', 'low'
   */
  priority?: string;

  /**
   * Ekstra notater eller detaljer om oppgaven
   * Kan inneholde utvidet beskrivelse eller kontekst
   */
  note?: string;

  /**
   * Relatert lenke til oppgaven
   * Kan være URL til ressurs eller dokument
   */
  link?: string;
}

/**
 * FILBESKRIVELSE
 * ------------------------------
 * 
 * Denne filen (task.ts) definerer datamodellen for todo-oppgaver
 * i applikasjonen. Den fungerer som et kontrakt mellom ulike
 * deler av systemet.
 * 
 * Strukturelle elementer:
 * 
 * 1. Kjerneinformasjon:
 *    - id: For unik identifisering
 *    - text: Hovedbeskrivelse
 *    - completed: Fullføringsstatus
 * 
 * 2. Tidsplanlegging:
 *    - dueDate: Forfallsdato
 *    - dueTime: Forfallstid
 * 
 * 3. Kategorisering:
 *    - category: Gruppering av oppgaver
 *    - priority: Viktighet/hastegrad
 * 
 * 4. Tilleggsinformasjon:
 *    - note: Utvidet beskrivelse
 *    - link: Relevante ressurser
 * 
 * Brukes av:
 * - TodoStore for datahåndtering
 * - Komponenter for visning
 * - Forms for oppgaveopprettelse
 * 
 * Dette grensesnittet er kritisk for:
 * - Typesikkerhet i utviklingen
 * - Konsistent datastruktur
 * - Dokumentasjon av datamodellen
 */
