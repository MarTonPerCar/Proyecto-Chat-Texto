import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessageComponent } from './group-message.component';

describe('GroupMessageComponent', () => {
  let component: GroupMessageComponent;
  let fixture: ComponentFixture<GroupMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
