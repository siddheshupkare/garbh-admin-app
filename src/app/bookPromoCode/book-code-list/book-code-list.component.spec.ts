import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCodeListComponent } from './book-code-list.component';

describe('BookCodeListComponent', () => {
  let component: BookCodeListComponent;
  let fixture: ComponentFixture<BookCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
