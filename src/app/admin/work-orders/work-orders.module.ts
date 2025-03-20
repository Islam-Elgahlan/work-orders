import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './components/work-orders/work-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WorkOrdersComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    SharedModule
  ]
})
export class WorkOrdersModule { }
