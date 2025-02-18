import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyTitlePreviewComponent } from './destiny-title-preview.component';

describe('DestinyTitlePreviewComponent', () => {
  let component: DestinyTitlePreviewComponent;
  let fixture: ComponentFixture<DestinyTitlePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyTitlePreviewComponent]
    });
    fixture = TestBed.createComponent(DestinyTitlePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
