import { Component } from '@angular/core';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [],
  templateUrl: './easter-egg.html',
})
export class EasterEgg {
  goBack() {
    localStorage.removeItem('egg_enabled');
    window.location.reload();
  }
}
