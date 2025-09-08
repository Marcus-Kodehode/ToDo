import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.html', // Peker til HTML-filen
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
