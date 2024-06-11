import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrBadgesComponent } from './cr-badges.component';

describe('CrBadgesComponent', () => {
  let component: CrBadgesComponent;
  let fixture: ComponentFixture<CrBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrBadgesComponent]
    });
    fixture = TestBed.createComponent(CrBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
