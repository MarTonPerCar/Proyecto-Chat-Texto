import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  };

  isTouchedAndInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get phone() { return this.registerForm.get('phone'); }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName, phone } = this.registerForm.value;

      try {
        await this.authService.register(email, password, firstName, lastName, phone).toPromise();
        this.router.navigate(['/login']);
      } catch (error: any) {
        console.error(error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'Este correo ya está registrado.';
            break;
          case 'permission-denied':
            this.errorMessage = 'No tienes permisos para guardar el usuario.';
            break;
          default:
            this.errorMessage = 'Error al registrar: ' + error.message;
        }
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
