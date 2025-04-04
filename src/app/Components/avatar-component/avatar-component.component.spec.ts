import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponentComponent } from './avatar-component.component';

describe('AvatarComponentComponent', () => {
  let component: AvatarComponentComponent;
  let fixture: ComponentFixture<AvatarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
