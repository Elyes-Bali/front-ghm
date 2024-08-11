import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Subscribe to the isLoggedIn$ observable
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.username = user.username;
        this.roles = user.roles || [];
      } else {
        this.username = undefined;
        this.roles = [];
      }
    });

    // Initial check to set the state based on existing data
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.roles = user.roles;
    }
  }

  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }

  isUserRolePsy(): boolean {
    return this.roles.includes('ROLE_MANAGER');
  }
  
  isUserRoleClient(): boolean {
    return this.roles.includes('ROLE_EMPLOYER');
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.storageService.clean();
        this.isLoggedIn = false;
        this.roles = [];
        this.username = undefined;
        console.log('Navigating to login');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });

  }
  
}
