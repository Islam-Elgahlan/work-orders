import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';

const routes: Routes = [
  {path:'' , component:WorkOrdersComponent},
  {path:'' , component:WorkOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersRoutingModule { }
