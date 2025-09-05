import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private readonly _tasks = signal<Task[]>(this.load());

  // read-only signals for consumers
  readonly tasks = this._tasks.asReadonly();
  readonly active = computed(() => this._tasks().filter((t) => !t.completed));
  readonly done = computed(() => this._tasks().filter((t) => t.completed));

  add(task: Task) {
    this._tasks.update((list) => [task, ...list]);
    this.save();
  }

  toggle(id: number) {
    this._tasks.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.save();
  }

  remove(id: number) {
    this._tasks.update((list) => list.filter((t) => t.id !== id));
    this.save();
  }

  clearCompleted() {
    this._tasks.update((list) => list.filter((t) => !t.completed));
    this.save();
  }

  private load(): Task[] {
    try {
      return JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    } catch {
      return [];
    }
  }

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this._tasks()));
  }
}
