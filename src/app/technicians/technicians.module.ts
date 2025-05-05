import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechniciansRoutingModule } from './technicians-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TechniciansRoutingModule,
    SharedModule
  ]
})
export class TechniciansModule { 
 
}
