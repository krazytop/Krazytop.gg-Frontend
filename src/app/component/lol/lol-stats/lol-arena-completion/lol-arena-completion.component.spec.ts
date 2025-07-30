import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolArenaCompletionComponent } from './lol-arena-completion.component';

describe('LolArenaCompletionComponent', () => {
  let component: LolArenaCompletionComponent;
  let fixture: ComponentFixture<LolArenaCompletionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolArenaCompletionComponent]
    });
    fixture = TestBed.createComponent(LolArenaCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
