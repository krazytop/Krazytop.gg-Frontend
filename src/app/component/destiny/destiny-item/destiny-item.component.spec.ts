import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyItemComponent } from './destiny-item.component';

describe('DestinyItemComponent', () => {
  let component: DestinyItemComponent;
  let fixture: ComponentFixture<DestinyItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyItemComponent]
    });
    fixture = TestBed.createComponent(DestinyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
