import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechniciansRoutingModule } from './technicians-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TechniciansRoutingModule
  ]
})
export class TechniciansModule { }
