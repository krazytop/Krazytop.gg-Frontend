import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolMatchParticipantComponent } from './lol-match-participant.component';

describe('LolMatchParticipantComponent', () => {
  let component: LolMatchParticipantComponent;
  let fixture: ComponentFixture<LolMatchParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolMatchParticipantComponent]
    });
    fixture = TestBed.createComponent(LolMatchParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
