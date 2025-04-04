import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationComponentComponent } from './conversation-component.component';

describe('ConversationComponentComponent', () => {
  let component: ConversationComponentComponent;
  let fixture: ComponentFixture<ConversationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
