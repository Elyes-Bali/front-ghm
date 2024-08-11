import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private storageService: StorageService, private router: Router) {}

 
}
