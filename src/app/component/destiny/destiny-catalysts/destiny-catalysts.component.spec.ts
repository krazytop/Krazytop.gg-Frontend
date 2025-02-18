import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyCatalystsComponent } from './destiny-catalysts.component';

describe('DestinyCatalystsComponent', () => {
  let component: DestinyCatalystsComponent;
  let fixture: ComponentFixture<DestinyCatalystsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyCatalystsComponent]
    });
    fixture = TestBed.createComponent(DestinyCatalystsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
