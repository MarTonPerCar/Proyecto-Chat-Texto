import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessageComponentComponent } from './group-message-component.component';

describe('GroupMessageComponentComponent', () => {
  let component: GroupMessageComponentComponent;
  let fixture: ComponentFixture<GroupMessageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupMessageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
