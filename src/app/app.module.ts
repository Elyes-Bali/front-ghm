import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';

import { VerifiactionComponent } from './verifiaction/verifiaction.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    LoginComponent,
    LogoComponent,
    RegisterComponent,
    DashboardComponent,
    ProductsComponent,
   
    VerifiactionComponent,
    ListUserComponent,
    ModifierUserComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ProductsDetailsComponent,
    ProfileComponent,
    
    ProjectComponent,
    TaskComponent,
    TaskDetailsComponent,
    AllTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
