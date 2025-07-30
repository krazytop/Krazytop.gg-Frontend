import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftMatchComponent } from './tft-match.component';
import {TranslateTestingModule} from "../../../../testing/translate-testing.module";

describe('TftMatchComponent', () => {
  let component: TftMatchComponent;
  let fixture: ComponentFixture<TftMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftMatchComponent],
      imports: [TranslateTestingModule]
    });
    fixture = TestBed.createComponent(TftMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
