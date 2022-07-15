import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialVideoComponent } from './special-video.component';

describe('SpecialVideoComponent', () => {
  let component: SpecialVideoComponent;
  let fixture: ComponentFixture<SpecialVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
