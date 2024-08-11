import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {StorageService} from "../_services/storage.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private storageService:StorageService,private router:Router) { }

  ngOnInit(): void {
    const userId = this.storageService.getUser().id;
    this.getUser(userId);
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    });
  }

  onSubmit(): void {
    let targetRoute = '';
    if (this.storageService.isAdminLoggedIn()) {
      targetRoute = 'listUser';
    } else if (this.storageService.isEmployerLoggedIn()) {
      targetRoute = 'mytask';
    } else if (this.storageService.isManagerLoggedIn()) {
      targetRoute = 'task';
    }else {
      targetRoute = 'login'; 
    }

    this.router.navigate([targetRoute], { replaceUrl: true });
  }
}
