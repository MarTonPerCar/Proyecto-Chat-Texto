import { Component, OnInit } from '@angular/core';
import {NgIf, NgFor, AsyncPipe, NgClass} from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoggedInHeaderComponent } from '../logged-in-header/logged-in-header.component';
import { ConversationComponent } from '../conversation/conversation.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
import {switchMap, of, Observable} from 'rxjs';
import { User } from '@angular/fire/auth';
import {Imagen} from '../../interfaces/imagenes.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-page-component',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    ConversationComponent,
    AvatarComponent,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './app-page-component.component.html',
  styleUrl: './app-page-component.component.css'
})
export class AppPageComponentComponent implements OnInit {
  contactos: any[] = [];
  userActual: User | null = null;

  miAvatarUrlMini = '';
  miNombreMini = 'Usuario';
  contactouid: string = '';

  datosImagenAddContanct$: Observable<Imagen | null> = of(null);
  datosImagenAddGroup$: Observable<Imagen | null> = of(null);
  datosImagenDeleteContact$: Observable<Imagen | null> = of(null);

  modoEliminarActivo: boolean = false;

  constructor(private authService: AuthService) {}

  selectedIndex: number | null = null;

  seleccionarUsuario(contacto: any, index: number) {
    if (this.modoEliminarActivo) {
      // Estamos en modo de eliminar
      Swal.fire({
        title: '¿Eliminar este contacto?',
        text: `Se eliminará a ${contacto.nombre} de tus contactos.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarContacto(contacto, index);
        }
      });
    } else {
      // Normal, seleccionamos la conversación
      this.selectedIndex = index;
      this.miAvatarUrlMini = contacto.avatarUrl;
      this.miNombreMini = contacto.nombre;
      this.contactouid = contacto.uid;
    }
  }

  ngOnInit(): void {
    this.cargarContactos();

    this.datosImagenAddContanct$ = this.authService.getImg("addContact");
    this.datosImagenAddGroup$ = this.authService.getImg("addGroup");
    this.datosImagenDeleteContact$ = this.authService.getImg("borrar");
  }

  cargarContactos() {
    this.contactos = [];

    this.authService.user$.pipe(
      switchMap((user) => {
        this.userActual = user;
        const uid = user?.uid || '';
        if (!uid) return of(null);
        return this.authService.getDatosUsuarioPorUid(uid);
      })
    ).subscribe((usuario: Usuario | null) => {
      if (usuario && usuario.contactos && usuario.contactos.length > 0) {
        let primerContacto = true;

        usuario.contactos.forEach(contactoUid => {
          this.authService.getDatosUsuarioPorUid(contactoUid).subscribe(contacto => {
            const nuevoContacto = {
              nombre: `${contacto.nombre} ${contacto.apellido}`,
              estado: contacto.estado || 'Este usuario todavía no tiene un estado definido',
              avatarUrl: contacto.url,
              uid: contactoUid
            };

            this.contactos.push(nuevoContacto);

            if (primerContacto) {
              this.miNombreMini = nuevoContacto.nombre;
              this.miAvatarUrlMini = nuevoContacto.avatarUrl;
              primerContacto = false;
            }
          });
        });
      }
    });
  }
  activarModoEliminar() {
    this.modoEliminarActivo = !this.modoEliminarActivo;
  }

  eliminarContacto(contacto: any, index: number) {
    if (!this.userActual) return;

    const miUid = this.userActual.uid;

    this.authService.deleteContacto(miUid, contacto.uid).subscribe({
      next: () => {
        this.cargarContactos();
        Swal.fire('Eliminado!', 'El contacto ha sido eliminado.', 'success');
        this.contactos.splice(index, 1); //
        this.modoEliminarActivo = false; //
      },
      error: (error) => {
        console.error('Error eliminando contacto:', error);
        Swal.fire('Error', 'No se pudo eliminar el contacto.', 'error');
      }
    });
  }
}
