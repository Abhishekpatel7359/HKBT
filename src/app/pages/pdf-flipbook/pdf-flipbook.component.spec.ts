import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFlipbookComponent } from './pdf-flipbook.component';

describe('PdfFlipbookComponent', () => {
  let component: PdfFlipbookComponent;
  let fixture: ComponentFixture<PdfFlipbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfFlipbookComponent]
    });
    fixture = TestBed.createComponent(PdfFlipbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
