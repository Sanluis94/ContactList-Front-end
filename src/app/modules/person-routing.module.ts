import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from '../components/person-list/person-list.component';
import { PersonFormComponent } from '../components/person-form/person-form.component';
import { HomeComponent } from '../components/home/home.component';  // Adicione esta importação
import { PersonTableComponent } from '../components/person-table/person-table.component';  // Adicione esta importação

const routes: Routes = [
  { path: '', component: HomeComponent },  // Página inicial
  { path: 'people', component: PersonTableComponent },
  { path: 'person-form', component: PersonFormComponent }, 
  { path: 'person-list', component: PersonListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
