import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDescriptionComponent } from './blog-description.component';

describe('BlogDescriptionComponent', () => {
  let component: BlogDescriptionComponent;
  let fixture: ComponentFixture<BlogDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogDescriptionComponent]
    });
    fixture = TestBed.createComponent(BlogDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
