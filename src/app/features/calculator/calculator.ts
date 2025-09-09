import { Component, signal, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './calculator.html',
})
export class Calculator {
  display = signal('0');
  history = signal<string[]>([]);

  private currentValue = '';
  private previousValue = '';
  private operator = '';

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
      this.inputNumber(key);
      return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
      this.inputOperator(key);
      return;
    }

    if (key === 'Enter' || key === '=') {
      event.preventDefault();
      this.calculate();
      return;
    }

    if (key === 'Escape' || key.toLowerCase() === 'c') {
      this.clear();
      return;
    }

    if (key === '.') {
      this.inputDecimal();
      return;
    }

    if (key === 'Backspace') {
      this.backspace();
      return;
    }
  }

  inputNumber(num: string) {
    const d = this.display();
    if (d === '0' || d === 'Error') {
      this.display.set(num);
    } else {
      this.display.set(d + num);
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
    let d = this.display();
    if (d === 'Error') d = '0';
    if (!d.includes('.')) {
      this.display.set(d + '.');
    }
  }

  backspace() {
    const d = this.display();
    if (d !== '0' && d.length > 1) {
      this.display.set(d.slice(0, -1));
      this.currentValue = this.display();
    } else {
      this.display.set('0');
      this.currentValue = '';
    }
  }

  percentage() {
    const current = parseFloat(this.display());
    if (!isNaN(current)) {
      const result = current / 100;
      this.display.set(result.toString());
      this.currentValue = result.toString();
    }
  }

  toggleSign() {
    const current = parseFloat(this.display());
    if (!isNaN(current)) {
      const result = current * -1;
      this.display.set(result.toString());
      this.currentValue = result.toString();
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
          if (curr === 0) {
            this.display.set('Error');
            this.currentValue = '';
            this.previousValue = '';
            this.operator = '';
            return;
          }
          result = prev / curr;
          break;
      }

      const calculation = `${prev} ${this.operator} ${curr} = ${result}`;
      this.addToHistory(calculation);

      this.display.set(result.toString());
      this.currentValue = result.toString();
      this.previousValue = '';
      this.operator = '';
    }
  }

  private addToHistory(calculation: string) {
    const list = this.history();
    if (list.length >= 5) list.pop();
    this.history.set([calculation, ...list]);
  }

  clear() {
    this.display.set('0');
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
  }

  clearHistory() {
    this.history.set([]);
  }
}
