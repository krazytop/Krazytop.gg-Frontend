import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DestinyItemOverlayComponent} from "./destiny-item-overlay.component";

describe('DestinyItemOverlayComponent', () => {
  let component: DestinyItemOverlayComponent;
  let fixture: ComponentFixture<DestinyItemOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyItemOverlayComponent]
    });
    fixture = TestBed.createComponent(DestinyItemOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
