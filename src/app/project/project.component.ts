import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectServiceService } from '../projectData/project-service.service';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { ERole } from '../models/ERole';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  projects: Project[] = [];
  managers: User[] = []; 
  private roles: string[] = [];
  isLoggedIn = false;
  currentUser: number = 0;
  status: boolean = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private projectService: ProjectServiceService, private userService:UserService ,private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.currentUser = user.id;
    }
    this.loadProjects();
    this.loadManagers();
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
    this.projectService.getAllProjects().subscribe(projects => {
      // Add a showDetails property to each project to manage the details toggle state
      this.projects = projects.map(project => ({ ...project, showDetails: false })).reverse();
    });
  }

  toggleDetails(index: number): void {
    // Toggle the showDetails property for the project at the specified index
    this.projects[index].showDetails = !this.projects[index].showDetails;
  }

  deleteProject(projectId: number): void {
    // Call the service to delete the project
    this.projectService.deleteProject(projectId).subscribe(() => {
      // Remove the project from the projects array after deletion
      this.projects = this.projects.filter(project => project.id !== projectId);
    });
  }

  createProject(name: string,description:string): void {
    const newProject: Project = { id: 0, name, description,managerId: 0, tasks: [] };
    this.projectService.createProject(newProject).subscribe(project => {
      this.projects.push(project);
    });
  }
  loadManagers(): void {
    console.log('Loading managers...'); // Debugging line
    this.userService.findByRolesName(ERole.ROLE_MANAGER).subscribe(
      managers => {
        console.log('Managers fetched:', managers); // Debugging line
        this.managers = managers;
      },
      error => {
        console.error('Error fetching managers:', error); // Debugging line
      }
    );
  }
  
  
  assignManagerToProject(projectId: string, managerId: string): void {
    const projectIdNumber = Number(projectId);
    const managerIdNumber = Number(managerId);

    this.projectService.assignManagerToProject(projectIdNumber, managerIdNumber).subscribe(response => {
      console.log('Manager assigned successfully', response);
    }, error => {
      console.error('Error assigning manager', error);
    });
  }
}
