import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyMainInventoryComponent } from './destiny-main-inventory.component';

describe('DestinyMainInventoryComponent', () => {
  let component: DestinyMainInventoryComponent;
  let fixture: ComponentFixture<DestinyMainInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyMainInventoryComponent]
    });
    fixture = TestBed.createComponent(DestinyMainInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
