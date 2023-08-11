import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './views/tasks-list/tasks-list.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listaTarefas',
    pathMatch: 'full',
    data: {
      reuseComponent: true
    }
  },
  {
    path: 'listaTarefas',
    component: TasksListComponent,
    data: {
      reuseComponent: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
 })
export class AppRoutingModule { }

