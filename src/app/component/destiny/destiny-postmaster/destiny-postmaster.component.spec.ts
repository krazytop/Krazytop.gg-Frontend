import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyPostmasterComponent } from './destiny-postmaster.component';

describe('DestinyPostmasterComponent', () => {
  let component: DestinyPostmasterComponent;
  let fixture: ComponentFixture<DestinyPostmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyPostmasterComponent]
    });
    fixture = TestBed.createComponent(DestinyPostmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
