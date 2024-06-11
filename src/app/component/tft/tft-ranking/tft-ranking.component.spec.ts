import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftRankingComponent } from './tft-ranking.component';

describe('TftRankingComponent', () => {
  let component: TftRankingComponent;
  let fixture: ComponentFixture<TftRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftRankingComponent]
    });
    fixture = TestBed.createComponent(TftRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
