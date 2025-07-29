import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LOLMainChampionsComponent } from './lol-main-champions.component';

describe('LOLMainChampionsComponent', () => {
  let component: LOLMainChampionsComponent;
  let fixture: ComponentFixture<LOLMainChampionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LOLMainChampionsComponent]
    });
    fixture = TestBed.createComponent(LOLMainChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
