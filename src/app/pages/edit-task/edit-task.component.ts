import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-edit-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  standalone: true,
})
export class EditTaskComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  taskToEdit: Task | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loadTasksFromLocalStorage();

    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskToEdit = this.tasksSubject.value.find(task => task.id === taskId);
  }

  saveTask() {
    if (this.taskToEdit) {
      const updatedTasks = this.tasksSubject.value.map(task =>
        task.id === this.taskToEdit!.id ? this.taskToEdit! : task
      );
      this.tasksSubject.next(updatedTasks);
      this.saveTasksToLocalStorage(updatedTasks);
      this.router.navigate(['/']);
    }
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
