import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  taskTitle: string = '';

  constructor() {}

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  addTask() {
    if (this.taskTitle.trim().length === 0) {
      return;
    }
    const currentTasks = this.tasksSubject.value;
    const newTask: Task = { id: Date.now(), title: this.taskTitle.trim(), completed: false };
    const updatedTasks = [...currentTasks, newTask];
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
    this.taskTitle = ''; 
  }

  private loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasksSubject.next(JSON.parse(tasks));
    }
  }

  private saveTasksToLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


}
