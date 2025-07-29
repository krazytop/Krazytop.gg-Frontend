import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TftLatestMatchesPlacementComponent} from "./tft-latest-matches-placement.component";

describe('TftLatestMatchesPlacementComponent', () => {
  let component: TftLatestMatchesPlacementComponent;
  let fixture: ComponentFixture<TftLatestMatchesPlacementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftLatestMatchesPlacementComponent]
    });
    fixture = TestBed.createComponent(TftLatestMatchesPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
