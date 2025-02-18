import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyCharacterItemFiltersComponent } from './destiny-character-item-filters.component';

describe('DestinyCharacterItemFiltersComponent', () => {
  let component: DestinyCharacterItemFiltersComponent;
  let fixture: ComponentFixture<DestinyCharacterItemFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyCharacterItemFiltersComponent]
    });
    fixture = TestBed.createComponent(DestinyCharacterItemFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
