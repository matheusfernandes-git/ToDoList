import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/interface/task';
import { Router } from '@angular/router';
import './tasks-list-css/header.css'
import './tasks-list-css/form.css'
import './tasks-list-css/list.css'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  taskslist: Task[] = [];
  formOpen: boolean = false;
  category: string = '';
  validation: boolean = false;
  editMode: boolean = false;
  btnText: string = 'Criar';
  titleText: string = 'Suas Tarefas';
  completedTask: Task[] = [];

  form: FormGroup = this.formBuilder.group({
    id: [0],
    task: ['', Validators.required],
    done: [false, Validators.required],
    category: ['', Validators.required],
    priority: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshTasks();
  }

  refreshTasks(): Task[] {
    this.service.searchTasks(this.category).subscribe((tasks) => {
      this.taskslist = tasks;
    });
    return this.taskslist;
  }

  showTasks() {
    this.titleText = 'Suas tarefas';
    this.formOpen = false;
    this.refreshTasks();
  }

  formVisibility() {
    this.formOpen = true;
    this.refreshTasks();
    this.resetForm();
  }

  createTask() {
    this.service.create(this.form.value).subscribe((task) => {
      this.taskslist.push(task);
    });
    this.resetForm();
    this.formOpen = false;
  }

  loadToEdit(task: Task) {
    this.editMode = true;
    this.formOpen = true;
    this.btnText = 'Salvar';
    this.form = this.formBuilder.group({
      id: [task.id],
      task: [task.task],
      done: [task.done],
      category: [task.category],
      priority: [task.priority],
    });
  }

  editTask() {
    const editedTask: Task = {
      id: this.form.value.id,
      task: this.form.value.task,
      done: this.form.value.done,
      category: this.form.value.category,
      priority: this.form.value.priority,
    };
    this.service.edit(editedTask).subscribe((updatedTask) => {
      const index = this.taskslist.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (index !== -1) {
        this.taskslist[index] = updatedTask;
      }
      this.resetForm();
      this.formOpen = false;
      this.editMode = false;
    });
  }

  deleteTask(taskToDelete: Task) {
    this.service.delete(taskToDelete.id).subscribe(() => {
      const index = this.taskslist.findIndex(
        (task) => task.id === taskToDelete.id
      );
      if (index !== -1) {
        this.taskslist.splice(index, 1);
      }
    });
  }

  showCompletedTasks(): Task[] {
    this.titleText = 'Tarefas Concluídas';
    this.formOpen = false;
    this.service
      .searchTasks(this.category, this.form.value.done)
      .subscribe((updatedTask) => {
        this.taskslist = updatedTask.filter((task) => task.done === true);
        this.completedTask = this.taskslist;
      });
    return this.taskslist;
  }

  deleteTaskFromCompleted(taskToDelete: Task) {
    const index = this.completedTask.findIndex(
      (task) => task.id === taskToDelete.id
    );
    if (index !== -1) {
      this.completedTask.splice(index, 1);
      this.service.changeCompleted(taskToDelete).subscribe();
    }
  }

  validatedField(fieldValue: string): string {
    if (
      this.form.get(fieldValue)?.errors &&
      this.form.get(fieldValue)?.touched
    ) {
      this.validation = false;
      return 'task-form invalid-input';
    } else {
      this.validation = true;
      return 'task-form';
    }
  }

  enableButton(): string {
    if (this.form.valid) {
      return 'create-button';
    } else return 'disabled-button';
  }

  finishtask(task: Task) {
    const updatedTask: Task = {
      ...task,
      done: !task.done,
    };
    this.service.finishTask(updatedTask).subscribe((updatedTask) => {
      const index = this.taskslist.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (index !== -1) {
        this.taskslist[index] = updatedTask;
      }
    });
  }

  cancel() {
    this.resetForm();
    this.formOpen = false;
  }

  resetForm() {
    this.form.reset({
      task: '',
      done: false,
      category: '',
      priority: '',
    });
  }
}
