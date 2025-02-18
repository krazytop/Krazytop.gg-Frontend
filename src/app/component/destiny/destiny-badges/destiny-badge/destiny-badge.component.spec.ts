import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyBadgeComponent } from './destiny-badge.component';

describe('DestinyBadgeComponent', () => {
  let component: DestinyBadgeComponent;
  let fixture: ComponentFixture<DestinyBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyBadgeComponent]
    });
    fixture = TestBed.createComponent(DestinyBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
