import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolMainRolesComponent } from './lol-main-roles.component';

describe('LolMainRolesComponent', () => {
  let component: LolMainRolesComponent;
  let fixture: ComponentFixture<LolMainRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolMainRolesComponent]
    });
    fixture = TestBed.createComponent(LolMainRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
