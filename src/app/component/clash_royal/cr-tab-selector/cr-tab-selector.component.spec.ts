import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTabSelectorComponent } from './cr-tab-selector.component';

describe('CrTabSelectorComponent', () => {
  let component: CrTabSelectorComponent;
  let fixture: ComponentFixture<CrTabSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrTabSelectorComponent]
    });
    fixture = TestBed.createComponent(CrTabSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
