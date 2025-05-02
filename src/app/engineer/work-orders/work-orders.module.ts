import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddMaterialComponent } from './components/edit-order/components/add-material/add-material.component';
import { AddSpareComponent } from './components/edit-order/components/add-spare/add-spare.component';


@NgModule({
  declarations: [
    WorkOrdersComponent,
    AddOrderComponent,
    EditOrderComponent,
    ViewOrderComponent,
    AddMaterialComponent,
    AddSpareComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    SharedModule
  ]
})
export class WorkOrdersModule { }
