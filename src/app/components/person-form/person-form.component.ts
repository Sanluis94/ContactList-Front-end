import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { ContactService } from '../../services/contact.service'; // Importando o serviço de contatos
import { Person } from '../../models/person';
import { ContactDTO } from '../../models/contact-dto';
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
  contacts: ContactDTO[] = [];
  showContacts = false; 

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private contactService: ContactService,
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
        this.personForm.reset(person);
        this.loadContacts();
      });
    }
  }


  loadContacts(): void {
    if (this.personId) {
      this.contactService.getContactsByPersonId(this.personId).subscribe((data: ContactDTO[]) => {
        this.contacts = data;
      });
    }
  }

  toggleContacts(): void {
    this.showContacts = !this.showContacts;
  }

  addContact(): void {
  }

  onSubmit(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }
  
    const person: Person = this.personForm.value;
    console.log('Enviando para a API:', JSON.stringify(person, null, 2));
  
    const confirmation = window.confirm('Tem certeza que deseja atualizar esta pessoa?');
    
    if (confirmation) {
      if (this.isEditing) {
        this.personService.updatePerson(this.personId!, person).subscribe({
          next: (response) => {
            console.log('Pessoa atualizada com sucesso:', response);
            alert('Pessoa atualizada com sucesso!');
            this.router.navigate(['/person-table']);
          },
          error: (err) => {
            console.error('Erro ao atualizar pessoa:', err);
            alert('Erro ao atualizar pessoa. Tente novamente.');
          }
        });
      } else {
        this.personService.createPerson(person).subscribe({
          next: () => {
            console.log('Pessoa criada com sucesso:', person);
            this.router.navigate(['/person-table']);
          },
          error: (err) => {
            console.error('Erro ao criar pessoa:', err);
            alert('Erro ao criar pessoa. Tente novamente.');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/person-table']);
  }
}
