import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyItemInformationsComponent } from './destiny-item-informations.component';

describe('DestinyItemInformationsComponent', () => {
  let component: DestinyItemInformationsComponent;
  let fixture: ComponentFixture<DestinyItemInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyItemInformationsComponent]
    });
    fixture = TestBed.createComponent(DestinyItemInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
