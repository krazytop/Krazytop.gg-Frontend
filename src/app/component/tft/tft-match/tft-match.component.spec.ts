import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftMatchComponent } from './tft-match.component';

describe('TftMatchComponent', () => {
  let component: TftMatchComponent;
  let fixture: ComponentFixture<TftMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftMatchComponent]
    });
    fixture = TestBed.createComponent(TftMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
