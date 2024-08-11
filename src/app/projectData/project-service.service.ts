import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  readonly apiUrl = 'http://localhost:8085/vita/api/project/';

  constructor(private httpclient: HttpClient) {}
  getAllProjects(): Observable<Project[]> {
    return this.httpclient.get<Project[]>(this.apiUrl+'getAll');
  }
 
  getProjectById(projectId: number): Observable<Project> {
    return this.httpclient.get<Project>(`${this.apiUrl}/${projectId}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.httpclient.post<Project>(this.apiUrl+'create', project);
  }

  assignManagerToProject(projectId: number, managerId: number): Observable<any> {
    return this.httpclient.put(`${this.apiUrl}assignManager/${projectId}/${managerId}`, {});
  }
  
  deleteProject(id: number): Observable<void> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.httpclient.delete<void>(url);
  }
}
