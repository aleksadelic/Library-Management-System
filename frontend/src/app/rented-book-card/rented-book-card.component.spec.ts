import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedBookCardComponent } from './rented-book-card.component';

describe('RentedBookCardComponent', () => {
  let component: RentedBookCardComponent;
  let fixture: ComponentFixture<RentedBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedBookCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
