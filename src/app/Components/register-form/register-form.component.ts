import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
    }, { validators: this.passwordsMatchValidator });
  }

  // Custom validator
  passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  };

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get phone() { return this.registerForm.get('phone'); }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      try {
        await createUserWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/login']); // o a donde quieras redirigir
      } catch (error: any) {
        console.error(error);
        this.errorMessage = error.message;
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
