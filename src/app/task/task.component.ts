import { Component, OnInit } from '@angular/core';
import { Task, TaskState } from '../models/task';
import { TaskServiceService } from '../projectData/task-service.service';
import { Project } from '../models/project';
import { ProjectServiceService } from '../projectData/project-service.service';
import { UserService } from '../_services/user.service';
import { ERole } from '../models/ERole';
import { User } from '../models/user';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tasks: Task[] = [];
  projects: Project[] = [];
  private roles: string[] = [];
  filteredProjects: Project[] = [];
  filteredTasks: Task[] = [];
  employer: User[] = []; 
  isLoggedIn = false;
  currentUser: number = 0;
  status: boolean = false;
  selectedEmployerName: string = '';
  errorMessage: string = '';
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

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.currentUser = user.id;
      console.log('Current role:', this.roles);
      
   
      console.log('Current user ID:', this.currentUser);

      this.loadProjects();
      this.loadEmployers();
      this.loadTasks();

    }
  }

  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }

  isUserRoleManager(): boolean {
    return this.roles.includes('ROLE_MANAGER');
  }

  isUserRoleEmployer(): boolean {
    return this.roles.includes('ROLE_EMPLOYER');
  }



  loadProjects(): void {
    console.log('Loading projects...');
    this.projectService.getAllProjects().subscribe(
      projects => {
        this.projects = projects;
        console.log('Projects fetched:', this.projects);
        this.filterProjectsForCurrentManager(); // Filter after fetching
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.MyTasks();
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  loadEmployers(): void {
    console.log('Loading employers...');
    this.userService.findByRolesName(ERole.ROLE_EMPLOYER).subscribe(
      employers => {
        console.log('Employers fetched:', employers);
        this.employer = employers;
      },
      error => {
        console.error('Error fetching employers:', error);
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
    } else {
      this.filteredTasks = [];
    }
  }
  
  onEmployerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.selectedEmployerName = selectElement.options[selectElement.selectedIndex].text;
    }
  }

 
  createTask(description: string, projectId: number, assignedUserId: number, assignedUserName: string): void {
    if (!description) {
      this.errorMessage = 'Task description cannot be empty.';
      return;
    }

    const newTask: Task = {
      id: 0, 
      description, 
      state: TaskState.NOT_COMPLETED, 
      projectId, 
      assignedUserId,
      assignedUserName
    };

    this.taskService.createTask(newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        console.log('Task created successfully:', task);
        this.errorMessage = '';  // Clear the error message on success
      },
      error: (err) => {
        console.error('Error creating task:', err);
        this.errorMessage = 'An error occurred while creating the task.';  // Display a generic error message
      }
    });
  }
  
  

  

  updateTaskState(taskId: number, state: TaskState): void {
    this.taskService.updateTaskState(taskId, state).subscribe(updatedTask => {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }

  assignTaskToUser(taskId: number, userId: number): void {
    this.taskService.assignTaskToUser(taskId, userId).subscribe(updatedTask => {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }



}
