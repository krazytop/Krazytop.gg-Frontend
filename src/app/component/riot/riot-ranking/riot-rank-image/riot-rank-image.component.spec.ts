import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotRankImageComponent } from './riot-rank-image.component';

describe('RiotRankImageComponent', () => {
  let component: RiotRankImageComponent;
  let fixture: ComponentFixture<RiotRankImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiotRankImageComponent]
    });
    fixture = TestBed.createComponent(RiotRankImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
