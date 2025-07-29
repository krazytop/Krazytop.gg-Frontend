import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BungieAuthComponent } from './bungie-auth.component';

describe('BungieAuthComponent', () => {
  let component: BungieAuthComponent;
  let fixture: ComponentFixture<BungieAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BungieAuthComponent]
    });
    fixture = TestBed.createComponent(BungieAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
