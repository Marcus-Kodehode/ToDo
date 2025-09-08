// features/easter-egg/easter-egg.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800"
    >
      <div class="text-center">
        <h1
          class="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text animate-pulse"
        >
          🎉 GRATULERER JOAKIM! 🎉
        </h1>
        <p class="mt-4 text-xl text-white/80">Du fant den hemmelige siden!</p>

        <button
          (click)="goBack()"
          class="mt-8 px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition"
        >
          Tilbake til appen
        </button>
      </div>
    </div>
  `,
})
export class EasterEgg {
  goBack() {
    localStorage.removeItem('egg_enabled');
    window.location.reload();
  }
}
