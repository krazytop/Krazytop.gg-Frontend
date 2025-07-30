import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBarComponent } from './result-bar.component';

describe('ResultBarComponent', () => {
  let component: ResultBarComponent;
  let fixture: ComponentFixture<ResultBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultBarComponent]
    });
    fixture = TestBed.createComponent(ResultBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
