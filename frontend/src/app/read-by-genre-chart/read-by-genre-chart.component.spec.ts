import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadByGenreChartComponent } from './read-by-genre-chart.component';

describe('ReadByGenreChartComponent', () => {
  let component: ReadByGenreChartComponent;
  let fixture: ComponentFixture<ReadByGenreChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadByGenreChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadByGenreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
