import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditOrderComponent,
    ViewOrderComponent,
    WorkOrdersComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    SharedModule
  ]
})
export class WorkOrdersModule { }
