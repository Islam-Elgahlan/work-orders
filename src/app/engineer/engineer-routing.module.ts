import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from '../auth/components/edit-profile/edit-profile.component';

const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path: 'edit-profile', component: EditProfileComponent },
    // {path:'users',loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule)},
    // {path:'departments',loadChildren:() => import('./departments/departments.module').then(m =>m.DepartmentsModule)},
    {path:'work-orders',loadChildren:() => import('./work-orders/work-orders.module').then(m =>m.WorkOrdersModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
