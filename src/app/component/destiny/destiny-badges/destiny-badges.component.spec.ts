import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyBadgesComponent } from './destiny-badges.component';

describe('DestinyBadgesComponent', () => {
  let component: DestinyBadgesComponent;
  let fixture: ComponentFixture<DestinyBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyBadgesComponent]
    });
    fixture = TestBed.createComponent(DestinyBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
