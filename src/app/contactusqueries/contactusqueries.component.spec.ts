import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusqueriesComponent } from './contactusqueries.component';

describe('ContactusqueriesComponent', () => {
  let component: ContactusqueriesComponent;
  let fixture: ComponentFixture<ContactusqueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusqueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
