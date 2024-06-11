import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolMatchesComponent } from './lol-matches.component';

describe('LolMatchesComponent', () => {
  let component: LolMatchesComponent;
  let fixture: ComponentFixture<LolMatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolMatchesComponent]
    });
    fixture = TestBed.createComponent(LolMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
