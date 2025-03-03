import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonTableComponent } from '../components/person-table/person-table.component';
import { PersonFormComponent } from '../components/person-form/person-form.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'person-table', component: PersonTableComponent },
  { path: 'person-form', component: PersonFormComponent },
  { path: 'person-form/:id', component: PersonFormComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
