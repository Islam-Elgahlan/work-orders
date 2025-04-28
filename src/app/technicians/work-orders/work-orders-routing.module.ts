import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';

const routes: Routes = [
  { path: '', component: WorkOrdersComponent },
  { path: 'work-orders', component: WorkOrdersComponent },
  { path: 'view-order/:id', component: ViewOrderComponent },
  { path: 'edit-order/:id', component: EditOrderComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersRoutingModule { }
