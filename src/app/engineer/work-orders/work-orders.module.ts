import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';


@NgModule({
  declarations: [
    WorkOrdersComponent,
    AddOrderComponent,
    EditOrderComponent,
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule
  ]
})
export class WorkOrdersModule { }
