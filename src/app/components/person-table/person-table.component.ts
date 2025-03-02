import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss']
})
export class PersonTableComponent {
  @Input() people: Person[] = [];

  constructor(private personService: PersonService, private router: Router) {}

  editPerson(id: number): void {
    this.router.navigate(['/person-form', id]);
  }

  deletePerson(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.personService.deletePerson(id).subscribe(() => {
        this.people = this.people.filter(person => person.id !== id);
      });
    }
  }

  addPerson(): void {
    this.router.navigate(['/person-form']); // Redireciona para a página de cadastro
  }
}
