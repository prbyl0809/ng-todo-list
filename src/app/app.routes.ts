import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', title: 'To Do List', component: TaskListComponent },
  { path: 'add-task', title: 'Add New Task', component: AddTaskComponent },
  { path: 'edit/:id', title: 'Edit Task', component: EditTaskComponent },
];

export class AppRoutingModule { }
