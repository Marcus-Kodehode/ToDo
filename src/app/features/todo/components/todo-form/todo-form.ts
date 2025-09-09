import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../models/task';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  newText = '';
  dueDate = '';
  dueTime = '';
  category = '';
  priority = '';
  note = '';
  link = '';

  taskAdded = output<Task>();
  clearCompleted = output<void>();

  onAdd() {
    if (!this.newText.trim()) return;

    const task: Task = {
      id: Date.now(),
      text: this.newText,
      dueDate: this.dueDate,
      dueTime: this.dueTime,
      category: this.category,
      priority: this.priority,
      note: this.note,
      link: this.link,
      completed: false,
    };

    this.taskAdded.emit(task);
    this.resetForm();
  }

  private resetForm() {
    this.newText = '';
    this.dueDate = '';
    this.dueTime = '';
    this.category = '';
    this.priority = '';
    this.note = '';
    this.link = '';
  }
}
