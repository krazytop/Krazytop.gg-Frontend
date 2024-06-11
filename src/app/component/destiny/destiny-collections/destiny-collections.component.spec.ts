import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyCollectionsComponent } from './destiny-collections.component';

describe('DestinyCollectionsComponent', () => {
  let component: DestinyCollectionsComponent;
  let fixture: ComponentFixture<DestinyCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyCollectionsComponent]
    });
    fixture = TestBed.createComponent(DestinyCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
