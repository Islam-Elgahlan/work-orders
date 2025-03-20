import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from '../auth/components/edit-profile/edit-profile.component';

const routes: Routes = [
  
  {path:'',component:DashboardComponent, children:[
    
    {
      path:"admin",loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
    // {
    //   path:"employee",loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule)
    //   }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
