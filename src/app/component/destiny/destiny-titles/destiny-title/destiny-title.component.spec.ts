import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyTitleComponent } from './destiny-title.component';

describe('DestinyTitleComponent', () => {
  let component: DestinyTitleComponent;
  let fixture: ComponentFixture<DestinyTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyTitleComponent]
    });
    fixture = TestBed.createComponent(DestinyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
