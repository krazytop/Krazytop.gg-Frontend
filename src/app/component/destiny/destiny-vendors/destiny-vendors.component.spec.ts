import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyVendorsComponent } from './destiny-vendors.component';

describe('DestinyVendorsComponent', () => {
  let component: DestinyVendorsComponent;
  let fixture: ComponentFixture<DestinyVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyVendorsComponent]
    });
    fixture = TestBed.createComponent(DestinyVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
