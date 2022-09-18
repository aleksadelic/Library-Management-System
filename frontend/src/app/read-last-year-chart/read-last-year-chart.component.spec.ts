import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadLastYearChartComponent } from './read-last-year-chart.component';

describe('ReadLastYearChartComponent', () => {
  let component: ReadLastYearChartComponent;
  let fixture: ComponentFixture<ReadLastYearChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadLastYearChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadLastYearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
