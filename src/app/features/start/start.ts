import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const NAME_KEY = 'app_name';
const EGG_NAME = 'joakim'; // skriv dette på startsiden for å aktivere easter egg

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './start.html',
})
export class Start {
  name = signal<string>(localStorage.getItem(NAME_KEY) ?? '');

  save() {
    const n = this.name().trim();
    if (!n) return;

    localStorage.setItem(NAME_KEY, n);

    if (n.toLowerCase() === EGG_NAME) localStorage.setItem('egg_enabled', '1');
    else localStorage.removeItem('egg_enabled');

    // gi App beskjed om å bytte til Todo
    dispatchEvent(new CustomEvent('name-saved'));
  }
}
