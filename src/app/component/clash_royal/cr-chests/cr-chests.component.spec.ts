import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrChestsComponent } from './cr-chests.component';

describe('CrChestsComponent', () => {
  let component: CrChestsComponent;
  let fixture: ComponentFixture<CrChestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrChestsComponent]
    });
    fixture = TestBed.createComponent(CrChestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
