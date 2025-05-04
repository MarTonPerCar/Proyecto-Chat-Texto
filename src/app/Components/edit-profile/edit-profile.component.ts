import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  profileForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name:    ['', Validators.required],
      surname: ['', Validators.required],
      phone:   ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]]
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { name, surname, phone } = this.profileForm.value;
    // Aquí llamas a tu servicio para actualizar la información del perfil
    console.log('Formulario enviado', { name, surname, phone });
    // Por ejemplo:
    // this.userService.updateProfile({ name, surname, phone }).subscribe(…);
  }
}
