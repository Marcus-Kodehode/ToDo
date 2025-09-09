import { Component, signal } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

import { Start } from './features/start/start';
import { Todo } from './features/todo/todo';
import { Calculator } from './features/calculator/calculator';
import { EasterEgg } from './features/easter-egg/easter-egg';
import { Header } from './features/shared/header/header';
import { Footer } from './features/shared/footer/footer';

type View = 'start' | 'main' | 'easter-egg';
type MainView = 'todo' | 'calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    Start,
    Todo,
    Calculator,
    EasterEgg,
    Header,
    Footer, // 👈 riktig her
  ],
  templateUrl: './app.html',
})
export class App {
  currentView = signal<View>('start');
  mainView = signal<MainView>('todo');
  userName = signal<string>('');
  setMainView(view: string) {
    this.mainView.set(view as MainView);
  }

  constructor() {
    this.checkUserStatus();
    window.addEventListener('name-saved', () => this.checkUserStatus());
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
