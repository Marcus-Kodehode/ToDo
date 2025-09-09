import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TodoStore } from '../../services/todo.store';
import { Task } from '../../models/task';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf], // IKKE TodoForm eller TaskList
  templateUrl: './todo.html',
})
export class Todo {
  newText = signal('');
  dueDate = signal('');
  dueTime = signal('');
  category = signal('');
  priority = signal('');
  note = signal('');
  link = signal('');

  constructor(private store: TodoStore) {}

  get tasks() {
    return this.store.tasks;
  }
  get active() {
    return this.store.active;
  }
  get done() {
    return this.store.done;
  }

  readonly progress = computed(() => {
    const list = this.store.tasks();
    const total = list.length;
    const d = list.filter((t) => t.completed).length;
    return total ? Math.round((d / total) * 100) : 0;
  });

  add() {
    const text = this.newText().trim();
    if (!text) return;

    const task: Task = {
      id: Date.now(),
      text,
      dueDate: this.dueDate(),
      dueTime: this.dueTime(),
      category: this.category(),
      priority: this.priority(),
      note: this.note(),
      link: this.link(),
      completed: false,
    };

    this.store.add(task);

    this.newText.set('');
    this.dueDate.set('');
    this.dueTime.set('');
    this.category.set('');
    this.priority.set('');
    this.note.set('');
    this.link.set('');
  }

  toggle(t: Task) {
    this.store.toggle(t.id);
  }
  remove(t: Task) {
    this.store.remove(t.id);
  }
  clearCompleted() {
    this.store.clearCompleted();
  }
}
