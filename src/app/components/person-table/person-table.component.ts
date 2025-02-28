import { Component, Input } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss']
})
export class PersonTableComponent {
  @Input() people: Person[] = [];

  constructor() {}
}
