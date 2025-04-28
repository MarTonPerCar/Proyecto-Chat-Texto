import {ChangeDetectorRef, Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Grupo } from '../../interfaces/grupo.interfaces';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

// Validador personalizado para emails separados por coma
function multipleEmailsValidator(control: AbstractControl): ValidationErrors | null {
  const emailsStr: string = control.value;
  if (!emailsStr) return null; // Si se agrega también Validators.required, se mostrará otro mensaje en caso de campo vacío

  // Dividir la cadena en emails y limpiar espacios
  const emails: string[] = emailsStr.split(',').map(email => email.trim());

  // Regex para validar formato de email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const invalidEmails = emails.filter(email => !emailRegex.test(email));

  // Si hay emails en formato incorrecto, se retorna un error con la lista
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
    private router: Router,
  private cd: ChangeDetectorRef
) {
    // Configuración del formulario. Se le agrega Validators.required a todos los campos
    this.form = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      contactos: ['', [Validators.required, multipleEmailsValidator]]
    });

    // Suscribirse al usuario actual
    this.authService.user$.subscribe(user => {
      this.userActual = user;
    });

    // Obtener la imagen de avatar (o usar un placeholder en su defecto).
    this.authService.getImg('avatar-contact').subscribe({
      next: (img) => {
        console.log('Imagen recibida:', img);  // Verifica en consola que el servicio te retorna los datos esperados.
        if (img && img.url) {
          this.imagenUrl = img.url;
        } else {
          this.imagenUrl = 'https://via.placeholder.com/100';
        }
        // Forzamos la actualización de la vista.
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener la imagen:', error);
        this.imagenUrl = 'https://via.placeholder.com/100';
      }
    });
  }

  onSubmit(): void {
    // Si el formulario es inválido, no se envía y se muestran los errores correspondientes
    if (this.form.invalid) {
      // Puedes opcionalmente marcar todos los controles como tocados para que se muestren los errores:
      this.form.markAllAsTouched();
      return;
    }
    this.crearGrupo();
  }

  private async crearGrupo(): Promise<void> {
    if (!this.userActual) {
      console.warn('No hay usuario logueado.');
      return;
    }

    const { name, descripcion, contactos } = this.form.value;

    try {
      await this.authService.createGroup(name, contactos, descripcion);
      console.log('Grupo creado correctamente');
      Swal.fire({
        icon: 'success',
        title: '¡Grupo creado!',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        this.router.navigate(['/chat']);
        this.form.reset();
      });
    } catch (error) {
      console.error('Error creando grupo:', error);
    }
  }
}
