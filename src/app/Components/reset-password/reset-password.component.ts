import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth, sendPasswordResetEmail} from '@angular/fire/auth';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.resetForm.get('email');
  }

  async onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.errorMessage = null;
    this.successMessage = null;

    try {
      await sendPasswordResetEmail(this.auth, this.email?.value!);
      this.successMessage = 'Se ha enviado el enlace de restablecimiento de contraseña.';
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'No existe un usuario con ese correo.';
      } else {
        this.errorMessage = 'Ocurrió un error. Inténtalo de nuevo.';
      }
    }
  }
}
