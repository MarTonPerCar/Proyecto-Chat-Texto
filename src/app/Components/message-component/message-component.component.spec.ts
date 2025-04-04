import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponentComponent } from './message-component.component';

describe('MessageComponentComponent', () => {
  let component: MessageComponentComponent;
  let fixture: ComponentFixture<MessageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
