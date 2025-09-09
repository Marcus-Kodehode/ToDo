import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="p-4 bg-black/20 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold">Hei, {{ userName }}! 👋</h1>
        
        <div class="flex gap-2">
          <button 
            (click)="viewChange.emit('todo')"
            [class.bg-emerald-500]="activeView === 'todo'"
            [class.bg-white/10]="activeView !== 'todo'"
            class="px-4 py-2 rounded-lg transition"
          >
            📝 Planlegger
          </button>
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
  @Input() userName: string = '';
  @Input() activeView: string = '';
  @Output() viewChange = new EventEmitter<string>();
}
