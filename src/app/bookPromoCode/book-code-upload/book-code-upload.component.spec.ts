import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCodeUploadComponent } from './book-code-upload.component';

describe('BookCodeUploadComponent', () => {
  let component: BookCodeUploadComponent;
  let fixture: ComponentFixture<BookCodeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCodeUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCodeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
