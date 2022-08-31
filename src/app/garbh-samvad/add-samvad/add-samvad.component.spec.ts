import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSamvadComponent } from './add-samvad.component';

describe('AddSamvadComponent', () => {
  let component: AddSamvadComponent;
  let fixture: ComponentFixture<AddSamvadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSamvadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSamvadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
