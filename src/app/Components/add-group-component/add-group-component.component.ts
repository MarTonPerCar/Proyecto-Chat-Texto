import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

function multipleEmailsValidator(control: AbstractControl): ValidationErrors | null {
  const emailsStr: string = control.value;
  if (!emailsStr) return null;

  const emails: string[] = emailsStr.split(',').map(email => email.trim());

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const invalidEmails = emails.filter(email => !emailRegex.test(email));

  return invalidEmails.length ? { invalidEmails } : null;
}

@Component({
  selector: 'app-add-group-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
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
    this.form = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      contactos: ['', [Validators.required, multipleEmailsValidator]]
    });

    this.authService.user$.subscribe(user => {
      this.userActual = user;
    });

    this.authService.getImg('avatar-grupo').subscribe({
      next: (img) => {
        this.imagenUrl = img?.url;
        this.cd.markForCheck();
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const emailActual = this.userActual?.email?.trim();
    const listaEmails: string[] = this.form.get('contactos')?.value
      .split(',')
      .map((e: string) => e.trim());

    if (!emailActual || listaEmails.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Faltan correos o información del usuario.',
        timer: 2500,
        showConfirmButton: false
      });
      return;
    }

    const incluyePropioCorreo = listaEmails.some(e => e.toLowerCase() === emailActual.toLowerCase());

    if (incluyePropioCorreo) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes agregarte a ti mismo',
        text: 'Quita tu correo del campo de contactos.',
        timer: 2500,
        showConfirmButton: false
      });
      return;
    }

    this.crearGrupo(listaEmails);
  }

  private async crearGrupo(emails: string[]): Promise<void> {
    if (!this.userActual) {
      console.warn('No hay usuario logueado.');
      return;
    }

    const { name, descripcion } = this.form.value;

    try {
      await this.authService.createGroup(name, emails, descripcion, this.userActual.uid);

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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el grupo. Inténtalo de nuevo.',
      });
    }
  }
}
