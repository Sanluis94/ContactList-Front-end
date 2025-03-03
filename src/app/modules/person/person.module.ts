import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PersonFormComponent } from '../../components/person-form/person-form.component';
import { PersonTableComponent } from '../../components/person-table/person-table.component';

import { PersonRoutingModule } from '../person-routing.module';

@NgModule({
  declarations: [
    PersonFormComponent,
    PersonTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersonRoutingModule
  ],
  exports: [
    PersonFormComponent,
    PersonTableComponent
  ]
})
export class PersonModule { }
