import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolRankingComponent } from './lol-ranking.component';

describe('LolRankingComponent', () => {
  let component: LolRankingComponent;
  let fixture: ComponentFixture<LolRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolRankingComponent]
    });
    fixture = TestBed.createComponent(LolRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
