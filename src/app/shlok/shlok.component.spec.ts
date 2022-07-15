import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShlokComponent } from './shlok.component';

describe('ShlokComponent', () => {
  let component: ShlokComponent;
  let fixture: ComponentFixture<ShlokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShlokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShlokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
