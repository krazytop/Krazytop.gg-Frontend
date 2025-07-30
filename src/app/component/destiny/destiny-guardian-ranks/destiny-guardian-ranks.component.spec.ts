import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyGuardianRanksComponent } from './destiny-guardian-ranks.component';

describe('DestinyGuardianRanksComponent', () => {
  let component: DestinyGuardianRanksComponent;
  let fixture: ComponentFixture<DestinyGuardianRanksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyGuardianRanksComponent]
    });
    fixture = TestBed.createComponent(DestinyGuardianRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
