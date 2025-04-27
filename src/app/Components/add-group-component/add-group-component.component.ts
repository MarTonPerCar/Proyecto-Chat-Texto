import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Grupo } from '../../interfaces/grupo.interfaces';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2'; // Importar SweetAlert2

// Validador personalizado para emails separados por coma
function multipleEmailsValidator(control: AbstractControl): ValidationErrors | null {
  const emailsStr: string = control.value;
  if (!emailsStr) return null;

  // Dividir la cadena en emails
  const emails: string[] = emailsStr.split(',').map(email => email.trim());

  // Regex para validar formato de email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const invalidEmails = emails.filter(email => !emailRegex.test(email));

  // Si hay alguno no válido, se retorna un error con el listado
  return invalidEmails.length ? { invalidEmails } : null;
}

@Component({
  selector: 'app-add-group-component',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-group-component.component.html',
  styleUrls: ['./add-group-component.component.css']
})
export class AddGroupComponentComponent {
  form: FormGroup;
  userActual: User | null = null;
  protected imagenUrl: string = '';
  nombreGrupo: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Configuración del formulario. Se añade el validador para el campo "contactos"
    this.form = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      contactos: ['', multipleEmailsValidator]
    });

    // Suscribirse al usuario actual
    this.authService.user$.subscribe(user => {
      this.userActual = user;
    });

    // Obtener la imagen de avatar
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

  onSubmit(): void {
    if (this.form.invalid) return;
    this.crearGrupo();
  }

  private crearGrupo(): void {
    if (!this.userActual) {
      console.warn('No hay usuario logueado.');
      return;
    }

    const { name, descripcion, contactos } = this.form.value;
    const nuevoGrupo: Grupo = {
      nombre: name,
      descripcion: descripcion,
      contactos: contactos ? contactos.split(',').map((c: string) => c.trim()) : [],
      url: this.imagenUrl
    };

    // Llamada al método del servicio para añadir el grupo
    this.authService.addGroup(nuevoGrupo.nombre, nuevoGrupo.descripcion, nuevoGrupo.contactos).subscribe({
      next: () => {
        console.log('Grupo creado correctamente');
        // Se muestra la animación/notificación con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Grupo creado!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          // Una vez cerrada la alerta, redirigimos al usuario y reiniciamos el formulario
          this.router.navigate(['/chat']);
          this.form.reset();
        });
      },
      error: (error) => {
        console.error('Error creando grupo:', error);
      }
    });
  }
}
