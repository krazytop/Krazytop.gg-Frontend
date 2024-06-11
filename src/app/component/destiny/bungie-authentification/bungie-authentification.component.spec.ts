import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BungieAuthentificationComponent } from './bungie-authentification.component';

describe('BungieAuthentificationComponent', () => {
  let component: BungieAuthentificationComponent;
  let fixture: ComponentFixture<BungieAuthentificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BungieAuthentificationComponent]
    });
    fixture = TestBed.createComponent(BungieAuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
