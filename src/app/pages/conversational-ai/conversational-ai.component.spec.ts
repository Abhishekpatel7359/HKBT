import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationalAiComponent } from './conversational-ai.component';

describe('ConversationalAiComponent', () => {
  let component: ConversationalAiComponent;
  let fixture: ComponentFixture<ConversationalAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationalAiComponent]
    });
    fixture = TestBed.createComponent(ConversationalAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
