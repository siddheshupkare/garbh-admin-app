import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicandshloksComponent } from './musicandshloks.component';

describe('MusicandshloksComponent', () => {
  let component: MusicandshloksComponent;
  let fixture: ComponentFixture<MusicandshloksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicandshloksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicandshloksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
