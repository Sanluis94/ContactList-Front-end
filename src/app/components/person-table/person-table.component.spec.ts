import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableComponent } from './person-table.component';

describe('PersonTableComponent', () => {
  let component: PersonTableComponent;
  let fixture: ComponentFixture<PersonTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonTableComponent]
    });
    fixture = TestBed.createComponent(PersonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
