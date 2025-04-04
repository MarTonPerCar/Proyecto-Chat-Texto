import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupPageComponent } from './create-group-page.component';

describe('CreateGroupPageComponent', () => {
  let component: CreateGroupPageComponent;
  let fixture: ComponentFixture<CreateGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
