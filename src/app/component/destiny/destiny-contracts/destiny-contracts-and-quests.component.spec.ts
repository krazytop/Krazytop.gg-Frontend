import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DestinyContractsAndQuestsComponent} from "./destiny-contracts-and-quests.component";

describe('DestinyContractsAndQuestsComponent', () => {
  let component: DestinyContractsAndQuestsComponent;
  let fixture: ComponentFixture<DestinyContractsAndQuestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyContractsAndQuestsComponent]
    });
    fixture = TestBed.createComponent(DestinyContractsAndQuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
