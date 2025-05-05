import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { BuildingComponent } from './components/building/building.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { EditBuildingComponent } from './components/edit-building/edit-building.component';


@NgModule({
  declarations: [
    BuildingComponent,
    EditBuildingComponent,
    AddBuildingComponent,
    EditBuildingComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    SharedModule
  ]
})
export class BuildingModule { }
