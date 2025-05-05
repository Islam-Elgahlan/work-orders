import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentsComponent } from './components/departments/departments.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';

@NgModule({
  declarations: [
    DepartmentsComponent,
    AddDepartmentComponent,
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule
  ]
})
export class DepartmentsModule { }
