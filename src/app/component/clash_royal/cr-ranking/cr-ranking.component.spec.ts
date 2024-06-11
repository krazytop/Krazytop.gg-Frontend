import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrRankingComponent } from './cr-ranking.component';

describe('CrRankingComponent', () => {
  let component: CrRankingComponent;
  let fixture: ComponentFixture<CrRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrRankingComponent]
    });
    fixture = TestBed.createComponent(CrRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
