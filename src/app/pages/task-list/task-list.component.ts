import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  filteredTasks: Task[] = [];
  filter: Filter = 'all';

  constructor() { }

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasksSubject.next(JSON.parse(tasks));
      this.applyFilter();
    }
  }

  toggleTaskCompletion(taskId: number) {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
    this.applyFilter();
  }

  deleteTask(taskId: number) {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
    this.applyFilter();
  }

  private saveTasksToLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  setFilter(filter: Filter) {
    this.filter = filter;
    this.applyFilter();
  }

  private applyFilter() {
    const tasks = this.tasksSubject.value;
    if (this.filter === 'all') {
      this.filteredTasks = tasks;
    } else if (this.filter === 'active') {
      this.filteredTasks = tasks.filter(task => !task.completed);
    } else if (this.filter === 'completed') {
      this.filteredTasks = tasks.filter(task => task.completed);
    }
  }

  get taskCount(): number {
    return this.filteredTasks.length;
  }

}
