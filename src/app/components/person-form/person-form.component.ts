import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  isEditMode = false;
  personId?: number;
  states: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']; // Adicione esta linha

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.personId) {
      this.isEditMode = true;
      this.personService.getPersonById(this.personId).subscribe(person => {
        this.personForm.patchValue(person);
      });
    }
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const person: Person = this.personForm.value;

      if (this.isEditMode) {
        this.personService.updatePerson(this.personId!, person).subscribe(() => {
          this.router.navigate(['/people']);
        });
      } else {
        this.personService.createPerson(person).subscribe(() => {
          this.router.navigate(['/people']);
        });
      }
    }
  }

  fetchAddress(): void {
    const cep = this.personForm.get('cep')?.value;
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(data => {
        this.personForm.patchValue({
          address: `${data.logradouro}, ${data.bairro}`,
          city: data.localidade,
          state: data.uf
        });
      });
    }
  }
}
