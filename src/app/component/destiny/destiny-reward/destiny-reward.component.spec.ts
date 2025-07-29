import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyRewardComponent } from './destiny-reward.component';

describe('DestinyRewardComponent', () => {
  let component: DestinyRewardComponent;
  let fixture: ComponentFixture<DestinyRewardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyRewardComponent]
    });
    fixture = TestBed.createComponent(DestinyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
