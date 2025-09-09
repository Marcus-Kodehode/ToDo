import { Component, signal, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, NgFor],
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
    if (event.key >= '0' && event.key <= '9') {
      this.inputNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      this.inputOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      this.calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
      this.clear();
    } else if (event.key === '.') {
      this.inputDecimal();
    } else if (event.key === 'Backspace') {
      this.backspace();
    }
  }

  inputNumber(num: string) {
    if (this.display() === '0' || this.display() === 'Error') {
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

  backspace() {
    if (this.display() !== '0' && this.display().length > 1) {
      this.display.set(this.display().slice(0, -1));
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

      // Add to history
      const calculation = `${prev} ${this.operator} ${curr} = ${result}`;
      this.addToHistory(calculation);

      this.display.set(result.toString());
      this.currentValue = result.toString();
      this.previousValue = '';
      this.operator = '';
    }
  }

  private addToHistory(calculation: string) {
    const currentHistory = this.history();
    if (currentHistory.length >= 5) {
      currentHistory.pop();
    }
    this.history.set([calculation, ...currentHistory]);
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
