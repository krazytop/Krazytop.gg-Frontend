import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolSearchCriteriaComponent } from './lol-search-criteria.component';

describe('LolSearchCriteriaComponent', () => {
  let component: LolSearchCriteriaComponent;
  let fixture: ComponentFixture<LolSearchCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolSearchCriteriaComponent]
    });
    fixture = TestBed.createComponent(LolSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
