import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyRecordComponent } from './destiny-record.component';

describe('DestinyRecordComponent', () => {
  let component: DestinyRecordComponent;
  let fixture: ComponentFixture<DestinyRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyRecordComponent]
    });
    fixture = TestBed.createComponent(DestinyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
