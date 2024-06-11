import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyComponentSelectorComponent } from './destiny-component-selector.component';

describe('DestinyComponentSelectorComponent', () => {
  let component: DestinyComponentSelectorComponent;
  let fixture: ComponentFixture<DestinyComponentSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyComponentSelectorComponent]
    });
    fixture = TestBed.createComponent(DestinyComponentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
