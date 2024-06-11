import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolStatsComponent } from './lol-stats.component';

describe('LolStatsComponent', () => {
  let component: LolStatsComponent;
  let fixture: ComponentFixture<LolStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolStatsComponent]
    });
    fixture = TestBed.createComponent(LolStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
