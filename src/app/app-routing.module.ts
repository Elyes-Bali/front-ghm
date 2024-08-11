import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { VerifiactionComponent } from './verifiaction/verifiaction.component';
import { ProfileComponent } from './profile/profile.component';

import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AuthGuard } from './auth.guard';
import { AllTasksComponent } from './all-tasks/all-tasks.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'edituser/:id', component: ModifierUserComponent },
  { path: 'verify', component: VerifiactionComponent },
  { path: 'edituser/:id', component: ModifierUserComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'verify', component: VerifiactionComponent },
  { path: 'listUser', component: ListUserComponent , canActivate: [AuthGuard]},
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'mytask', component: TaskDetailsComponent, canActivate: [AuthGuard] },
  { path: 'alltasks', component: AllTasksComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
