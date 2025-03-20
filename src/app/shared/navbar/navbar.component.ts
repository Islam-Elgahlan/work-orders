import { Component } from '@angular/core';
import { LogoutComponent } from './logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  name:string | null =''
  email:string |null =''
  hidden = false; 

  ngOnInit(){
    this.getCurrentUser()
  }
  constructor(
    private _Router: Router,
    public dialog: MatDialog
  ) {}
  logOut() {
    const dialogRef = this.dialog.open(LogoutComponent);
  }
  getCurrentUser(){
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');

  }
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
