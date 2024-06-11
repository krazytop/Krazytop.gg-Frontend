import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyCraftablesComponent } from './destiny-craftables.component';

describe('DestinyCraftablesComponent', () => {
  let component: DestinyCraftablesComponent;
  let fixture: ComponentFixture<DestinyCraftablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyCraftablesComponent]
    });
    fixture = TestBed.createComponent(DestinyCraftablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
