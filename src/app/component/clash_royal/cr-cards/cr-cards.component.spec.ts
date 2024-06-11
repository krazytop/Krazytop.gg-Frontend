import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCardsComponent } from './cr-cards.component';

describe('CrCardsComponent', () => {
  let component: CrCardsComponent;
  let fixture: ComponentFixture<CrCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrCardsComponent]
    });
    fixture = TestBed.createComponent(CrCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
