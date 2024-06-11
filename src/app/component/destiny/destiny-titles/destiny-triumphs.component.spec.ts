import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyTriumphsComponent } from './destiny-triumphs.component';

describe('DestinyTriumphsComponent', () => {
  let component: DestinyTriumphsComponent;
  let fixture: ComponentFixture<DestinyTriumphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyTriumphsComponent]
    });
    fixture = TestBed.createComponent(DestinyTriumphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
