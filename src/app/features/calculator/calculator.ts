/**
 * @fileoverview Calculator Component
 * A full-featured calculator implementation with keyboard support and calculation history.
 */

import { Component, signal, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';

/**
 * @component Calculator
 * @description
 * A standalone calculator component that provides basic arithmetic operations.
 * Features include:
 * - Basic arithmetic operations (+, -, *, /)
 * - Decimal point support
 * - Percentage calculations
 * - Sign toggling (+/-)
 * - Calculation history
 * - Keyboard support
 * - Error handling for division by zero
 */
@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './calculator.html',
})
export class Calculator {
  /** Signal for the current display value of the calculator */
  display = signal('0');
  
  /** Signal for storing calculation history (max 5 entries) */
  history = signal<string[]>([]);

  /** Stores the current input value as a string */
  private currentValue = '';
  
  /** Stores the previous value for binary operations */
  private previousValue = '';
  
  /** Stores the current arithmetic operator (+, -, *, /) */
  private operator = '';

  /**
   * Listens for keyboard events to enable keyboard input support
   * @param event The keyboard event
   */
  @HostListener('window:keydown', ['$event'])
  /**
   * Handles keyboard input events for calculator operations
   * Supports:
   * - Numbers (0-9)
   * - Operators (+, -, *, /)
   * - Enter/= for calculation
   * - Escape/C for clear
   * - Decimal point
   * - Backspace for deletion
   */
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

  /**
   * Handles numeric input (0-9)
   * @param num The number to input as a string
   */
  inputNumber(num: string) {
    const d = this.display();
    if (d === '0' || d === 'Error') {
      this.display.set(num);
    } else {
      this.display.set(d + num);
    }
    this.currentValue = this.display();
  }

  /**
   * Handles operator input (+, -, *, /)
   * Stores the current value and operator for later calculation
   * @param op The operator to apply
   */
  inputOperator(op: string) {
    if (this.currentValue) {
      this.previousValue = this.currentValue;
      this.operator = op;
      this.currentValue = '';
      this.display.set('0');
    }
  }

  /**
   * Adds a decimal point to the current number if one doesn't already exist
   * Resets display if in error state
   */
  inputDecimal() {
    let d = this.display();
    if (d === 'Error') d = '0';
    if (!d.includes('.')) {
      this.display.set(d + '.');
    }
  }

  /**
   * Handles backspace operation
   * Removes the last digit from the current display value
   * Resets to '0' if only one digit remains
   */
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

  /**
   * Converts the current display value to a percentage (divides by 100)
   */
  percentage() {
    const current = parseFloat(this.display());
    if (!isNaN(current)) {
      const result = current / 100;
      this.display.set(result.toString());
      this.currentValue = result.toString();
    }
  }

  /**
   * Toggles the sign (positive/negative) of the current display value
   */
  toggleSign() {
    const current = parseFloat(this.display());
    if (!isNaN(current)) {
      const result = current * -1;
      this.display.set(result.toString());
      this.currentValue = result.toString();
    }
  }

  /**
   * Performs the calculation based on the stored operator and values
   * Handles basic arithmetic operations and division by zero errors
   * Adds the calculation to history upon completion
   */
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

  /**
   * Adds a calculation to the history
   * Maintains a maximum of 5 entries in LIFO order
   * @param calculation The calculation string to add to history
   */
  private addToHistory(calculation: string) {
    const list = this.history();
    if (list.length >= 5) list.pop();
    this.history.set([calculation, ...list]);
  }

  /**
   * Clears the calculator state
   * Resets display, current value, previous value, and operator
   */
  clear() {
    this.display.set('0');
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
  }

  /**
   * Clears the calculation history
   */
  clearHistory() {
    this.history.set([]);
  }
}

/**
 * File Documentation
 * -----------------
 * Purpose:
 * This file implements a full-featured calculator component for the ToDo application.
 * It provides a user-friendly interface for performing basic arithmetic calculations
 * with both mouse and keyboard input support.
 *
 * Key Features:
 * 1. Basic Arithmetic Operations
 *    - Addition, subtraction, multiplication, division
 *    - Percentage calculation
 *    - Sign toggling
 *    - Decimal point support
 *
 * 2. User Interface
 *    - Clear digital display
 *    - Calculator keypad
 *    - Calculation history (last 5 calculations)
 *
 * 3. Input Methods
 *    - Mouse clicks on calculator buttons
 *    - Keyboard input support for all operations
 *    - Backspace for corrections
 *
 * 4. Error Handling
 *    - Division by zero protection
 *    - Invalid input prevention
 *    - Clear error state functionality
 *
 * Technical Details:
 * - Implemented as a standalone Angular component
 * - Uses signals for reactive state management
 * - Implements keyboard event handling
 * - Maintains calculation history with LIFO queue
 * 
 * Usage:
 * <app-calculator></app-calculator>
 */
