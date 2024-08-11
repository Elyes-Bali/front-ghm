import {Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../components/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {StorageService} from "../_services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  response: any = {
    mfaEnabled: false
  };
  otpCode = '';
  isVerifySuccessful = false;
  isVerifyFailed = false;

  constructor(private authService: AuthService, private storageService: StorageService,private router: Router ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
  
    this.authService.login(username, password).subscribe({
      next: data => {
        this.response = data;
        if(!data.mfaEnabled) {
          this.storageService.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
  
          let targetRoute = '';
          if (this.storageService.isAdminLoggedIn()) {
            targetRoute = 'listUser';
          } else if (this.storageService.isEmployerLoggedIn()) {
            targetRoute = 'mytask';
          } else if (this.storageService.isManagerLoggedIn()) {
            targetRoute = 'task';
          }
  
          this.router.navigate([targetRoute], { replaceUrl: true });
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  

  verifyTfa() {
    const verifyRequest = {
      username: this.form.username,
      code: this.otpCode
    }
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (data: any) => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.reloadPage();
        },
        error: (err: any) => {
          this.isVerifySuccessful = false;
          this.isVerifyFailed = true; ;
        }
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
