import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DestinyTitlesComponent} from "./destiny-titles.component";

describe('DestinyTitlesComponent', () => {
  let component: DestinyTitlesComponent;
  let fixture: ComponentFixture<DestinyTitlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyTitlesComponent]
    });
    fixture = TestBed.createComponent(DestinyTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
