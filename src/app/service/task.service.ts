import { Task } from './../interface/task';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'https://json-tasks.onrender.com/tasks';
  constructor(private http: HttpClient) {}

  searchTasks(category: string, done?: boolean): Observable<Task[]> {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });
    if (category) {
      params = params.append('category', category);
    }
    if (done === true) {
      params = params.append('done', done);
    }
    return this.http.get<Task[]>(this.apiUrl, { params });
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  edit(task: Task) {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  finishTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  changeCompleted(tasks: Task): Observable<Task> {
    tasks.done = !tasks.done;
    return this.edit(tasks);
  }

  delete(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url);
  }
}
