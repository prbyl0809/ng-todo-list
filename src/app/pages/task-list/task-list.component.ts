import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasksSubject.next(JSON.parse(tasks));
    }
  }

  toggleTaskCompletion(taskId: number) {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  deleteTask(taskId: number) {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  private saveTasksToLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}
