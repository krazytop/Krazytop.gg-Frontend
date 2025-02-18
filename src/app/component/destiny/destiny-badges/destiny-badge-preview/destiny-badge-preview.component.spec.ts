import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyBadgePreviewComponent } from './destiny-badge-preview.component';

describe('DestinyBadgePreviewComponent', () => {
  let component: DestinyBadgePreviewComponent;
  let fixture: ComponentFixture<DestinyBadgePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyBadgePreviewComponent]
    });
    fixture = TestBed.createComponent(DestinyBadgePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
