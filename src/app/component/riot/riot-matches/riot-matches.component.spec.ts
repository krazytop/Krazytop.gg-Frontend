import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RiotMatchesComponent} from "./riot-matches.component";

describe('RiotMatchesComponent', () => {
  let component: RiotMatchesComponent;
  let fixture: ComponentFixture<RiotMatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiotMatchesComponent]
    });
    fixture = TestBed.createComponent(RiotMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
