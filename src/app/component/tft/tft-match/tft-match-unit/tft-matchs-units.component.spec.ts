import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TftMatchUnitComponent} from "./tft-match-unit.component";

describe('TftMatchUnitComponent', () => {
  let component: TftMatchUnitComponent;
  let fixture: ComponentFixture<TftMatchUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftMatchUnitComponent]
    });
    fixture = TestBed.createComponent(TftMatchUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
