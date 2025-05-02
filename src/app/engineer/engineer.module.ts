import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    SharedModule
  ]
})
export class EngineerModule { }
