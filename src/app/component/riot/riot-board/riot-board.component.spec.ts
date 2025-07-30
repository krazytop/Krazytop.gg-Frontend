import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiotBoardComponent } from './riot-board.component';

describe('RiotBoardComponent', () => {
  let component: RiotBoardComponent;
  let fixture: ComponentFixture<RiotBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiotBoardComponent]
    });
    fixture = TestBed.createComponent(RiotBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
