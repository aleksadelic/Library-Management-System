import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingHistoryComponent } from './renting-history.component';

describe('RentingHistoryComponent', () => {
  let component: RentingHistoryComponent;
  let fixture: ComponentFixture<RentingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
