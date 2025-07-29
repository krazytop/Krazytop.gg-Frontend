import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyNodeResultsComponent } from './destiny-node-results.component';

describe('DestinyNodeResultsComponent', () => {
  let component: DestinyNodeResultsComponent;
  let fixture: ComponentFixture<DestinyNodeResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyNodeResultsComponent]
    });
    fixture = TestBed.createComponent(DestinyNodeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
