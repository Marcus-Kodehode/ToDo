import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import { Start } from './features/start/start';
import { Todo } from './features/todo/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, Start, Todo],
  template: `
    <ng-container *ngIf="hasName(); else start">
      <app-todo></app-todo>
    </ng-container>

    <ng-template #start>
      <app-start></app-start>
    </ng-template>
  `,
})
export class App {
  hasName(): boolean {
    return !!localStorage.getItem('name');
  }
}
