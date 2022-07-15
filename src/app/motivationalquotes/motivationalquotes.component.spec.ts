import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationalquotesComponent } from './motivationalquotes.component';

describe('MotivationalquotesComponent', () => {
  let component: MotivationalquotesComponent;
  let fixture: ComponentFixture<MotivationalquotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivationalquotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationalquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
