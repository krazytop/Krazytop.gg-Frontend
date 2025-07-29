import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotRankingComponent } from './riot-ranking.component';

describe('RiotRankingComponent', () => {
  let component: RiotRankingComponent;
  let fixture: ComponentFixture<RiotRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiotRankingComponent]
    });
    fixture = TestBed.createComponent(RiotRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
