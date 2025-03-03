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
  isEditing = false;
  personId?: number;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.personForm = this.fb.group({
      active: [true],
      address: ['', Validators.required],
      city: ['', Validators.required],
      contactType: [null, Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });
  }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.personId) {
      this.isEditing = true;
      this.personService.getPersonById(this.personId).subscribe(person => {
        this.personForm.reset(person); // Usa reset para garantir atualização correta
      });
    }
  }

  onSubmit(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const person: Person = this.personForm.value;
    console.log('Enviando para a API:', JSON.stringify(person, null, 2));

    if (this.isEditing) {
      // Se estiver editando, faz um PUT
      this.personService.updatePerson(this.personId!, person).subscribe({
        next: () => {
          console.log('Pessoa atualizada com sucesso:', person);
          this.router.navigate(['/person-table']);
        },
        error: (err) => {
          console.error('Erro ao atualizar pessoa:', err);
        }
      });
    } else {
      // Se não estiver editando, faz um POST para criar uma nova pessoa
      this.personService.createPerson(person).subscribe({
        next: () => {
          console.log('Pessoa criada com sucesso:', person);
          this.router.navigate(['/person-table']);
        },
        error: (err) => {
          console.error('Erro ao criar pessoa:', err);
        }
      });
    }
  }

  fetchAddress(): void {
    const zipCode = this.personForm.get('zipCode')?.value;
    if (zipCode.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${zipCode}/json/`).subscribe(data => {
        if (!data.erro) {
          this.personForm.patchValue({
            address: `${data.logradouro}, ${data.bairro}`,
            city: data.localidade,
            state: data.uf
          });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/person-table']);
  }
}
