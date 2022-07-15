import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotivationalVideoComponent } from './add-motivational-video.component';

describe('AddMotivationalVideoComponent', () => {
  let component: AddMotivationalVideoComponent;
  let fixture: ComponentFixture<AddMotivationalVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotivationalVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotivationalVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
