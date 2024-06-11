import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftLatestMatchesResultsComponent } from './tft-latest-matches-results.component';

describe('TftLatestMatchesResultsComponent', () => {
  let component: TftLatestMatchesResultsComponent;
  let fixture: ComponentFixture<TftLatestMatchesResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftLatestMatchesResultsComponent]
    });
    fixture = TestBed.createComponent(TftLatestMatchesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
