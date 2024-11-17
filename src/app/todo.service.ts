import { Injectable } from '@angular/core';
import { TodoItem } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  loadTasks(): TodoItem[] {
    if (typeof window !== 'undefined' && localStorage) {
      const tasks = localStorage.getItem('todoList');
      return tasks ? JSON.parse(tasks) : [];
    }
    return [];
  }

  saveTasks(todoList: TodoItem[]): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }
}
