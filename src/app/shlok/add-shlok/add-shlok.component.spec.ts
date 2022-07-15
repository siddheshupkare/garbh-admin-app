import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShlokComponent } from './add-shlok.component';

describe('AddShlokComponent', () => {
  let component: AddShlokComponent;
  let fixture: ComponentFixture<AddShlokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShlokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShlokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
