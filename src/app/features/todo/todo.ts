import { Component, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoStore } from '../../services/todo.store';
import { Task } from '../../models/task';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgFor, NgIf, TodoForm],
  templateUrl: './todo.html',
})
export class Todo {
  // Legg til denne linjen for å deklarere store
  store: TodoStore;

  constructor(private todoStore: TodoStore) {
    // Sett store til todoStore
    this.store = todoStore;
  }

  active = computed(() => this.store.active());
  done = computed(() => this.store.done());

  progress = computed(() => {
    const list = this.store.tasks();
    const total = list.length;
    const d = list.filter((t) => t.completed).length;
    return total ? Math.round((d / total) * 100) : 0;
  });

  addTask(task: Task) {
    this.store.add(task);
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
