import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditWorkOrdersComponent } from './components/add-edit-work-orders/add-edit-work-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    WorkOrdersComponent,
    AddEditWorkOrdersComponent,
    ViewOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    SharedModule,
    NgxPrintModule
  ]
})
export class WorkOrdersModule { }
