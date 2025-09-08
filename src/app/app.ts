// app.ts
import { Component, signal, effect } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

import { Start } from './features/start/start';
import { Todo } from './features/todo/todo';
import { Calculator } from './features/calculator/calculator';
import { EasterEgg } from './features/easter-egg/easter-egg';

type View = 'start' | 'main' | 'easter-egg';
type MainView = 'todo' | 'calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, Start, Todo, Calculator, EasterEgg],
  template: `
    <ng-container [ngSwitch]="currentView()">
      <!-- Startskjerm -->
      <app-start *ngSwitchCase="'start'"></app-start>
      
      <!-- Easter egg -->
      <app-easter-egg *ngSwitchCase="'easter-egg'"></app-easter-egg>
      
      <!-- Hovedapp -->
      <div *ngSwitchCase="'main'" class="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white">
        <!-- Header med toggle -->
        <div class="p-4 bg-black/20 backdrop-blur-sm">
          <div class="max-w-6xl mx-auto flex items-center justify-between">
            <h1 class="text-2xl font-bold">Hei, {{ userName() }}! 👋</h1>
            
            <div class="flex gap-2">
              <button 
                (click)="mainView.set('todo')"
                [class.bg-emerald-500]="mainView() === 'todo'"
                [class.bg-white/10]="mainView() !== 'todo'"
                class="px-4 py-2 rounded-lg transition"
              >
                📝 Planlegger
              </button>
              <button 
                (click)="mainView.set('calculator')"
                [class.bg-emerald-500]="mainView() === 'calculator'"
                [class.bg-white/10]="mainView() !== 'calculator'"
                class="px-4 py-2 rounded-lg transition"
              >
                🧮 Kalkulator
              </button>
            </div>
          </div>
        </div>
        
        <!-- Innhold -->
        <div class="p-4">
          <app-todo *ngIf="mainView() === 'todo'"></app-todo>
          <app-calculator *ngIf="mainView() === 'calculator'"></app-calculator>
        </div>
      </div>
    </ng-container>
  `,
})
export class App {
  currentView = signal<View>('start');
  mainView = signal<MainView>('todo');
  userName = signal<string>('');

  constructor() {
    // Sjekk status ved oppstart
    this.checkUserStatus();

    // Lytt på event fra Start-komponenten
    window.addEventListener('name-saved', () => {
      this.checkUserStatus();
    });
  }

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
