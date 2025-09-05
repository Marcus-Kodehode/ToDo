export interface Task {
  id: number;
  text: string;

  dueDate?: string;
  dueTime?: string;
  category?: string;
  priority?: string;
  note?: string;
  link?: string;

  completed: boolean; // <- required by your code
}
