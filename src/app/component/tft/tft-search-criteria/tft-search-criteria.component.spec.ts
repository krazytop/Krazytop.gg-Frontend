import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TftSearchCriteriaComponent } from './tft-search-criteria.component';

describe('TftSearchCriteriaComponent', () => {
  let component: TftSearchCriteriaComponent;
  let fixture: ComponentFixture<TftSearchCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TftSearchCriteriaComponent]
    });
    fixture = TestBed.createComponent(TftSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
