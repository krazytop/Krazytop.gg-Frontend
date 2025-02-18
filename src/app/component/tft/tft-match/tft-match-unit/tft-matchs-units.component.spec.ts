import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftMatchsUnitsComponent } from './tft-matchs-units.component';

describe('TftMatchsUnitsComponent', () => {
  let component: TftMatchsUnitsComponent;
  let fixture: ComponentFixture<TftMatchsUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftMatchsUnitsComponent]
    });
    fixture = TestBed.createComponent(TftMatchsUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
