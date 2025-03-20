import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { BlockUsersComponent } from './components/users/block-users/block-users.component';


@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent,
    BlockUsersComponent
  ],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule
  ]
})
export class AdminUsersModule { }
