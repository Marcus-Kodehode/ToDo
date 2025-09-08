// features/calculator/calculator.ts
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl">
      <div class="mb-4">
        <input
          [value]="display()"
          readonly
          class="w-full text-right text-2xl p-4 bg-slate-800/50 rounded-lg border border-slate-600"
        />
      </div>

      <div class="grid grid-cols-4 gap-2">
        <!-- Rad 1 -->
        <button (click)="clear()" class="col-span-2 btn bg-red-500/20 text-red-300">C</button>
        <button (click)="inputOperator('/')" class="btn">÷</button>
        <button (click)="inputOperator('*')" class="btn">×</button>

        <!-- Rad 2 -->
        <button (click)="inputNumber('7')" class="btn">7</button>
        <button (click)="inputNumber('8')" class="btn">8</button>
        <button (click)="inputNumber('9')" class="btn">9</button>
        <button (click)="inputOperator('-')" class="btn">-</button>

        <!-- Rad 3 -->
        <button (click)="inputNumber('4')" class="btn">4</button>
        <button (click)="inputNumber('5')" class="btn">5</button>
        <button (click)="inputNumber('6')" class="btn">6</button>
        <button (click)="inputOperator('+')" class="btn">+</button>

        <!-- Rad 4 -->
        <button (click)="inputNumber('1')" class="btn">1</button>
        <button (click)="inputNumber('2')" class="btn">2</button>
        <button (click)="inputNumber('3')" class="btn">3</button>
        <button (click)="calculate()" class="btn bg-emerald-500/20 text-emerald-300 row-span-2">
          =
        </button>

        <!-- Rad 5 -->
        <button (click)="inputNumber('0')" class="col-span-2 btn">0</button>
        <button (click)="inputDecimal()" class="btn">.</button>
      </div>
    </div>
  `,
  styles: [
    `
      .btn {
        @apply p-4 rounded-lg bg-white/10 hover:bg-white/20 transition font-semibold;
      }
    `,
  ],
})
export class Calculator {
  display = signal('0');
  private currentValue = '';
  private previousValue = '';
  private operator = '';

  inputNumber(num: string) {
    if (this.display() === '0') {
      this.display.set(num);
    } else {
      this.display.set(this.display() + num);
    }
    this.currentValue = this.display();
  }

  inputOperator(op: string) {
    if (this.currentValue) {
      this.previousValue = this.currentValue;
      this.operator = op;
      this.currentValue = '';
      this.display.set('0');
    }
  }

  inputDecimal() {
    if (!this.display().includes('.')) {
      this.display.set(this.display() + '.');
    }
  }

  calculate() {
    if (this.previousValue && this.currentValue && this.operator) {
      const prev = parseFloat(this.previousValue);
      const curr = parseFloat(this.currentValue);
      let result = 0;

      switch (this.operator) {
        case '+':
          result = prev + curr;
          break;
        case '-':
          result = prev - curr;
          break;
        case '*':
          result = prev * curr;
          break;
        case '/':
          result = prev / curr;
          break;
      }

      this.display.set(result.toString());
      this.currentValue = result.toString();
      this.previousValue = '';
      this.operator = '';
    }
  }

  clear() {
    this.display.set('0');
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
  }
}
