import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyModelsComponent } from './destiny-models.component';

describe('DestinyModelsComponent', () => {
  let component: DestinyModelsComponent;
  let fixture: ComponentFixture<DestinyModelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinyModelsComponent]
    });
    fixture = TestBed.createComponent(DestinyModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
