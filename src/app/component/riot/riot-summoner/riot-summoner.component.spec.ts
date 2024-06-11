import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotSummonerComponent } from './riot-summoner.component';

describe('riot-summmonerComponent', () => {
  let component: RiotSummonerComponent;
  let fixture: ComponentFixture<RiotSummonerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiotSummonerComponent]
    });
    fixture = TestBed.createComponent(RiotSummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
