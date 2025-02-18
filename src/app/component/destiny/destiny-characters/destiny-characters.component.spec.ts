import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyCharactersComponent } from './destiny-characters.component';

describe('DestinyCharactersComponent', () => {
  let component: DestinyCharactersComponent;
  let fixture: ComponentFixture<DestinyCharactersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyCharactersComponent]
    });
    fixture = TestBed.createComponent(DestinyCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
