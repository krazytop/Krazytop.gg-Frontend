import { ComponentFixture, TestBed } from '@angular/core/testing';
import {LOLMainFriendsComponent} from "./lol-main-friends.component";

describe('LOLMainFriendsComponent', () => {
  let component: LOLMainFriendsComponent;
  let fixture: ComponentFixture<LOLMainFriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LOLMainFriendsComponent]
    });
    fixture = TestBed.createComponent(LOLMainFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
