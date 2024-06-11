import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyVendorComponent } from './destiny-vendor.component';

describe('DestinyVendorComponent', () => {
  let component: DestinyVendorComponent;
  let fixture: ComponentFixture<DestinyVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyVendorComponent]
    });
    fixture = TestBed.createComponent(DestinyVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
