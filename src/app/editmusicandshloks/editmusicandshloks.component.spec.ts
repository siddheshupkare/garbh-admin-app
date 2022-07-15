import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmusicandshloksComponent } from './editmusicandshloks.component';

describe('EditmusicandshloksComponent', () => {
  let component: EditmusicandshloksComponent;
  let fixture: ComponentFixture<EditmusicandshloksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmusicandshloksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmusicandshloksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
