import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskState } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  readonly apiUrl = 'http://localhost:8085/vita/api/task/';
  constructor(private httpclient: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.httpclient.get<Task[]>(this.apiUrl+'all');
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.httpclient.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.httpclient.post<Task>(this.apiUrl+'create', task);
  }

  updateTaskState(taskId: number, state: TaskState): Observable<Task> {
    return this.httpclient.put<Task>(`${this.apiUrl}updateState/${taskId}`, {}, { params: { state } });
  }

  assignTaskToUser(taskId: number, userId: number): Observable<Task> {
    return this.httpclient.put<Task>(`${this.apiUrl}assign/${taskId}/${userId}`, {});
  }
}
