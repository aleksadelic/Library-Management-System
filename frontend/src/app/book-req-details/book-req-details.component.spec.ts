import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReqDetailsComponent } from './book-req-details.component';

describe('BookReqDetailsComponent', () => {
  let component: BookReqDetailsComponent;
  let fixture: ComponentFixture<BookReqDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReqDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
