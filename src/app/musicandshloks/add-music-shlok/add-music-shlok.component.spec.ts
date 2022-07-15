import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicShlokComponent } from './add-music-shlok.component';

describe('AddMusicShlokComponent', () => {
  let component: AddMusicShlokComponent;
  let fixture: ComponentFixture<AddMusicShlokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMusicShlokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMusicShlokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
