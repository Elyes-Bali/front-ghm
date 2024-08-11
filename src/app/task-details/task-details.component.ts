import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../projectData/task-service.service';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { ERole } from '../models/ERole';
import { User } from '../models/user';
import { Task, TaskState } from '../models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  tasks: Task[] = [];
  private roles: string[] = [];
  isLoggedIn = false;
  currentUser: number = 0;
  employer: User[] = []; 
  filteredTasks: Task[] = [];
  public TaskState = TaskState;
  status: boolean = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(
    private taskService: TaskServiceService,

    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      console.log('Current user ID:', this.roles);

      this.currentUser = user.id;
      console.log('Current user ID:', this.currentUser);

    
      this.loadTasks();
      this.loadEmployers();
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
  
  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filterTasksForCurrentManager(); 
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



  filterTasksForCurrentManager(): void {
    if (this.currentUser) {
      console.log('Current User ID (number):', this.currentUser);
      console.log('Tasks:', this.tasks);
  
      this.filteredTasks = this.tasks.filter(tasks => tasks.assignedUserId === this.currentUser);
      console.log('Filtered Task:', this.filteredTasks);
    } else {
      this.filteredTasks = [];
    }
  }


  updateTaskState(task: Task, newState: TaskState): void {
    if (task.id !== undefined) {  // Ensure task.id is defined
      this.taskService.updateTaskState(task.id, newState).subscribe(
        (updatedTask) => {
          console.log('Task state updated:', updatedTask);
          // Optionally update the task in the local list or reload tasks
          task.state = updatedTask.state;
        },
        (error) => {
          console.error('Error updating task state:', error);
        }
      );
    } else {
      console.error('Task ID is undefined. Cannot update state.');
    }
  }
  
  getTaskStateClass(state: string): string {
    switch (state) {
      case 'not_completed':
        return 'not_completed';
      case 'ongoing':
        return 'ongoing';
      case 'finished':
        return 'finished';
      default:
        return '';
    }
  }


}
