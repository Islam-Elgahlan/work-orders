import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoutComponent } from './navbar/logout/logout.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ToastrModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports:[
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ToastrModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
