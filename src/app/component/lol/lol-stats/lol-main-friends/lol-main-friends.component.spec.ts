import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolMainFriendsComponent } from './lol-main-friends.component';

describe('LolMainFriendsComponent', () => {
  let component: LolMainFriendsComponent;
  let fixture: ComponentFixture<LolMainFriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolMainFriendsComponent]
    });
    fixture = TestBed.createComponent(LolMainFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
