import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCityComponent } from './smart-city.component';

describe('SmartCityComponent', () => {
  let component: SmartCityComponent;
  let fixture: ComponentFixture<SmartCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartCityComponent]
    });
    fixture = TestBed.createComponent(SmartCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
