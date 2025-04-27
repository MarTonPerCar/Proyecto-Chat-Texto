import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupComponentComponent } from './add-group-component.component';

describe('AddGroupComponentComponent', () => {
  let component: AddGroupComponentComponent;
  let fixture: ComponentFixture<AddGroupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
