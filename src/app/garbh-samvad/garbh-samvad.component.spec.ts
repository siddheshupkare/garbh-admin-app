import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbhSamvadComponent } from './garbh-samvad.component';

describe('GarbhSamvadComponent', () => {
  let component: GarbhSamvadComponent;
  let fixture: ComponentFixture<GarbhSamvadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarbhSamvadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbhSamvadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
