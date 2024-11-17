import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';
import { TodoService } from './todo.service';  
export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoList';
  todoList: TodoItem[] = [];
  newTask: string = '';
  errorMessage: string = '';  // لإظهار رسائل الأخطاء للمستخدم

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTasks(); 
  }


  addTask() {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(), 
        task: this.newTask,
        completed: false // المهمة تبدأ غير مكتملة
      };
      this.todoList.push(newTodoItem);
      this.newTask = ''; // مسح حقل الإدخال بعد إضافة المهمة
      this.errorMessage = ''; // مسح رسالة الخطأ إن وجدت
      this.saveTasks(); // حفظ التحديث في localStorage
    } else {
      this.errorMessage = 'Please enter a task'; // تحسين الرسالة لتكون أكثر وضوحًا
    }
  }

  // تغيير حالة المهمة إلى مكتملة أو غير مكتملة
  todoCompleted(index: number) {
    this.todoList[index].completed = !this.todoList[index].completed;
    this.saveTasks(); // حفظ التحديث في localStorage
  }

  // حذف مهمة من القائمة بناءً على id
  deleteTask(id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTasks(); // حفظ التحديث في localStorage
  }

  // دالة لتحميل المهام من localStorage باستخدام الخدمة
  loadTasks() {
    this.todoList = this.todoService.loadTasks(); // استخدام الخدمة لتحميل المهام
  }
  
  // دالة لحفظ المهام في localStorage باستخدام الخدمة
  saveTasks() {
    this.todoService.saveTasks(this.todoList); // استخدام الخدمة لحفظ المهام
  }
}
