import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailPageComponent } from './reset-password-email-page.component';

describe('ResetPasswordEmailPageComponent', () => {
  let component: ResetPasswordEmailPageComponent;
  let fixture: ComponentFixture<ResetPasswordEmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordEmailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
