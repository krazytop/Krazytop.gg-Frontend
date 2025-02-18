import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolMainChampionsComponent } from './lol-main-champions.component';

describe('LolMainChampionsComponent', () => {
  let component: LolMainChampionsComponent;
  let fixture: ComponentFixture<LolMainChampionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolMainChampionsComponent]
    });
    fixture = TestBed.createComponent(LolMainChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
