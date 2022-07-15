import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogasanvideosComponent } from './yogasanvideos.component';

describe('YogasanvideosComponent', () => {
  let component: YogasanvideosComponent;
  let fixture: ComponentFixture<YogasanvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YogasanvideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YogasanvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
