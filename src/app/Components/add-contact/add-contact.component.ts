import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  form: FormGroup;
  mensajeArriba: string = 'Introduce un email';
  nombreContacto: string = 'usuario';
  imagenUrl: string = '';
  botonBuscar: boolean = true;
  uidBuscado: string = '';
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
        this.imagenUrl = img?.url || 'https://via.placeholder.com/100';
      }
    });
  }

  searchAndFindContact() {
    if (this.botonBuscar) {
      this.buscarContacto();
    } else {
      this.añadirContacto();
    }
  }

  private async buscarContacto() {
    const emailIntroducido = this.form.get('email')?.value?.trim();
    if (!emailIntroducido) {
      this.resetBusqueda('Introduce un email válido');
      return;
    }

    const miEmail = this.userActual?.email?.trim().toLowerCase();
    if (miEmail && emailIntroducido.toLowerCase() === miEmail) {
      this.resetBusqueda('No puedes agregarte a ti mismo');
      return;
    }

    const contactosCollection = collection(this.authService.firestore, 'usuarios');
    const q = query(contactosCollection, where('email', '==', emailIntroducido));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.resetBusqueda('No existe ese usuario');
        return;
      }

      const docSnap = querySnapshot.docs[0];
      const usuario = docSnap.data() as Usuario;
      this.uidBuscado = docSnap.id;

      const miUid = this.userActual?.uid;
      if (!miUid) {
        this.resetBusqueda('No has iniciado sesión');
        return;
      }

      this.authService.getDatosUsuarioPorUid(miUid).subscribe(miUsuario => {
        if (miUsuario?.contactos?.includes(this.uidBuscado)) {
          this.resetBusqueda('Ya tienes agregado este contacto');
          return;
        }

        // ✅ Todo correcto, actualizamos la vista
        this.nombreContacto = `${usuario.nombre} ${usuario.apellido}`;
        this.imagenUrl = usuario.url || 'https://via.placeholder.com/100';
        this.mensajeArriba = 'Usuario encontrado';
        this.botonBuscar = false;
      });

    } catch (error) {
      console.error('Error buscando usuario:', error);
      this.resetBusqueda('Error buscando usuario');
    }
  }

  private añadirContacto() {
    if (!this.userActual || !this.uidBuscado) {
      console.warn('No hay usuario logueado o UID buscado.');
      return;
    }

    const miUid = this.userActual.uid;

    this.authService.addContacto(miUid, this.uidBuscado).subscribe({
      next: () => {
        this.mensajeArriba = '¡Contacto añadido!';
        Swal.fire({
          icon: 'success',
          title: '¡Contacto añadido!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/chat']);
        });

        this.resetFormulario();
      },
      error: (error) => {
        console.error('Error añadiendo contacto:', error);
      }
    });
  }

  private resetFormulario() {
    this.botonBuscar = true;
    this.nombreContacto = 'usuario';
    this.imagenUrl = '';
    this.uidBuscado = '';
    this.form.reset();
  }

  private resetBusqueda(mensaje: string, tipo: 'warning' | 'error' = 'warning') {
    this.mensajeArriba = mensaje;
    this.nombreContacto = 'usuario';
    this.uidBuscado = '';
    this.botonBuscar = true;

    Swal.fire({
      icon: tipo,
      title: mensaje,
      timer: 2000,
      showConfirmButton: false,
    });

    this.authService.getImg('avatar-contact').subscribe({
      next: (img) => {
        this.imagenUrl = img?.url || 'https://via.placeholder.com/100';
      }
    });
  }

}
