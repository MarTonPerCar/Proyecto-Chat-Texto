import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSettingsPageComponent } from './reset-password-settings-page.component';

describe('ResetPasswordSettingsPageComponent', () => {
  let component: ResetPasswordSettingsPageComponent;
  let fixture: ComponentFixture<ResetPasswordSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordSettingsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
