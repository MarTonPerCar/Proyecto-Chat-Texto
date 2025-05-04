import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarNameComponent } from './avatar-name.component';

describe('AvatarNameComponent', () => {
  let component: AvatarNameComponent;
  let fixture: ComponentFixture<AvatarNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
