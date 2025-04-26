import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contact',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './add-contact.component.html',
  standalone: true,
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  form: FormGroup;
  mensajeArriba: string = 'Introduce un email';
  nombreContacto: string = 'usuario';
  imagenUrl: string = '';
  botonBuscar: boolean = true;
  emailBuscado: string = '';
  userActual: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
    });

    this.authService.user$.subscribe(user => {
      this.userActual = user;
    });

    this.authService.getImg('avatar-contact').subscribe({
      next: (img) => {
        if (img && img.url) {
          this.imagenUrl = img.url;
        } else {
          this.imagenUrl = 'https://via.placeholder.com/100';
        }
      },
    });
  }

  searchAndFindContact() {
    if (this.botonBuscar) {
      this.buscarContacto();
    } else {
      this.añadirContacto();
    }
  }

  private buscarContacto() {
    const emailOriginal = this.form.get('email')?.value?.toLowerCase();
    const emailSanitizado = emailOriginal?.replace(/\./g, '(dot)');

    if (!emailOriginal || !emailSanitizado) {
      console.warn('No hay email para buscar');
      return;
    }

    this.authService.getDatosUsuario(emailSanitizado).subscribe({
      next: (usuario: Usuario) => {
        if (usuario) {
          this.nombreContacto = `${usuario.nombre} ${usuario.apellido}`;
          this.imagenUrl = usuario.url;
          this.mensajeArriba = 'Usuario encontrado';
          this.botonBuscar = false;
          this.emailBuscado = emailOriginal; // 🔥 se guarda tal cual, sin sanitizar
        }
      },
      error: () => {
        this.mensajeArriba = 'No existe ese usuario';
        this.nombreContacto = 'prueba';
        this.imagenUrl = 'https://via.placeholder.com/100';
        this.botonBuscar = true;
        this.emailBuscado = '';
      }
    });
  }

  private añadirContacto() {
    if (!this.userActual || !this.emailBuscado) {
      console.warn('No hay usuario logueado o email buscado.');
      return;
    }

    const miEmail = this.userActual.email?.toLowerCase()?.replace(/\./g, '(dot)');
    if (!miEmail) {
      console.error('Email del usuario logueado no disponible');
      return;
    }

    this.authService.addContacto(miEmail, this.emailBuscado).subscribe({
      next: () => {
        this.mensajeArriba = '¡Contacto añadido!';
        console.log('Contacto añadido correctamente');

        Swal.fire({
          icon: 'success',
          title: '¡Contacto añadido!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/chat']);
        });

        // Reiniciar estado
        this.botonBuscar = true;
        this.nombreContacto = 'prueba';
        this.imagenUrl = '';
        this.form.reset();
      },
      error: (error) => {
        console.error('Error añadiendo contacto:', error);
      }
    });
  }
}
