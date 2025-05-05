import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './components/sources/sources.component';
import { AddSourceComponent } from './components/add-source/add-source.component';
import { EditSourceComponent } from './components/edit-source/edit-source.component';


@NgModule({
  declarations: [
    SourcesComponent,
    AddSourceComponent,
    EditSourceComponent
  ],
  imports: [
    CommonModule,
    SourcesRoutingModule
  ]
})
export class SourcesModule { }
