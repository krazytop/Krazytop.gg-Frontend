import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DestinySimpleObjectiveComponent} from "./destiny-simple-objective.component";

describe('DestinySimpleObjectiveComponent', () => {
  let component: DestinySimpleObjectiveComponent;
  let fixture: ComponentFixture<DestinySimpleObjectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinySimpleObjectiveComponent]
    });
    fixture = TestBed.createComponent(DestinySimpleObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
