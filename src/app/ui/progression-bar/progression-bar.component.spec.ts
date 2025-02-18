import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionBarComponent } from './progression-bar.component';

describe('ProgressionBarComponent', () => {
  let component: ProgressionBarComponent;
  let fixture: ComponentFixture<ProgressionBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressionBarComponent]
    });
    fixture = TestBed.createComponent(ProgressionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
