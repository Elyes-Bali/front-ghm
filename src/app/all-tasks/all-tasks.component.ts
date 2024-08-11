import { Component, OnInit } from '@angular/core';
import { Task, TaskState } from '../models/task';
import { Project } from '../models/project';
import { User } from '../models/user';
import { TaskServiceService } from '../projectData/task-service.service';
import { ProjectServiceService } from '../projectData/project-service.service';
import { UserService } from '../components/user.service';
import { StorageService } from '../_services/storage.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks: Task[] = [];
  projects: Project[] = [];
  private roles: string[] = [];
  filteredProjects: Project[] = [];
  filteredTasks: Task[] = [];
  combinedTaskInfo: { description: string; state: string; projectName: string,assignedUserName:string; }[] = [];
  employer: User[] = []; 
  isLoggedIn = false;
  currentUser: number = 0;
  status: boolean = false;

  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(
    private taskService: TaskServiceService,
    private projectService: ProjectServiceService,
    private userService: UserService,
    private storageService: StorageService
  ) {}
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }

  isUserRoleManager(): boolean {
    return this.roles.includes('ROLE_MANAGER');
  }

  isUserRoleEmployer(): boolean {
    return this.roles.includes('ROLE_EMPLOYER');
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.currentUser = user.id;
      console.log('Current role:', this.roles);
      console.log('Current user ID:', this.currentUser);

      this.loadData();
    }
  }

  loadData(): void {
    forkJoin({
      projects: this.projectService.getAllProjects(),
      tasks: this.taskService.getAllTasks()
    }).subscribe(
      ({ projects, tasks }) => {
        this.projects = projects;
        this.tasks = tasks;
        console.log('Projects and Tasks loaded:', this.projects, this.tasks);
  
        this.filterProjectsForCurrentManager(); // Filter projects after loading
        this.MyTasks(); // Filter tasks after loading projects
      },
      error => {
        console.error('Error loading data:', error);
      }
    );
  }
  
  filterProjectsForCurrentManager(): void {
    if (this.currentUser) {
      console.log('Current User ID (number):', this.currentUser);
      console.log('Projects:', this.projects);
  
      this.filteredProjects = this.projects.filter(project => project.managerId === this.currentUser);
      console.log('Filtered Projects:', this.filteredProjects);
    } else {
      this.filteredProjects = [];
    }
  }
  
  MyTasks(): void {
    if (this.filteredProjects.length > 0) {
      console.log('Filtered Projects:', this.filteredProjects);
  
      const filteredProjectIds = this.filteredProjects.map(project => project.id);
      console.log('Filtered Project IDs:', filteredProjectIds);
  
      this.filteredTasks = this.tasks.filter(task => filteredProjectIds.includes(task.projectId));
      console.log('Filtered Tasks:', this.filteredTasks);
  
      this.combinedTaskInfo = this.filteredTasks.map(task => {
        const project = this.projects.find(p => p.id === task.projectId);
        return {
          description: task.description ?? 'No Description', // Provide a default value if description is undefined
          assignedUserName: task.assignedUserName ?? 'No Description',
          state: TaskState[task.state], // Convert TaskState enum to string
          projectName: project ? project.name : 'Unknown Project'
        };
      });
  
      console.log('Combined Task Info:', this.combinedTaskInfo);
    } else {
      this.filteredTasks = [];
      this.combinedTaskInfo = [];
    }
  }
  
}
