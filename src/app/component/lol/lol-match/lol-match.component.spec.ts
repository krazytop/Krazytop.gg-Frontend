import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolMatchComponent } from './lol-match.component';

describe('LolMatchComponent', () => {
  let component: LolMatchComponent;
  let fixture: ComponentFixture<LolMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolMatchComponent]
    });
    fixture = TestBed.createComponent(LolMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
