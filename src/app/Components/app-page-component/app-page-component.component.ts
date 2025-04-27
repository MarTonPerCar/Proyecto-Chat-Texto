// app-page-component.component.ts
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoggedInHeaderComponent } from '../logged-in-header/logged-in-header.component';
import { ConversationComponent } from '../conversation/conversation.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { Grupo } from '../../interfaces/grupo.interfaces';
import { switchMap, of } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-app-page-component',
  standalone: true,
  imports: [
    LoggedInHeaderComponent,
    RouterModule,
    NgIf,
    NgFor,
    ConversationComponent,
    AvatarComponent
  ],
  templateUrl: './app-page-component.component.html',
  styleUrl: './app-page-component.component.css'
})
export class AppPageComponentComponent implements OnInit {
  contactos: any[] = [];  // Listado de contactos
  grupos: Grupo[] = [];     // Listado de grupos
  miAvatarUrl: string = '';
  miNombre: string = 'Usuario';
  userActual: User | null = null;

  // Variables para la sección mini, que se actualizan al seleccionar contacto o grupo
  miAvatarUrlMini = '';
  miNombreMini = 'Usuario';

  constructor(private authService: AuthService) {}

  seleccionarUsuario(contacto: any) {
    this.miAvatarUrlMini = contacto.avatarUrl;
    this.miNombreMini = contacto.nombre;
  }

  seleccionarGrupo(grupo: Grupo) {
    // Al seleccionar un grupo, actualizamos los datos mini con la información del grupo.
    this.miNombreMini = grupo.nombre;
    this.miAvatarUrlMini = grupo.url || 'https://via.placeholder.com/100';
  }

  ngOnInit(): void {
    // Recuperar información del usuario y sus contactos
    this.authService.user$.pipe(
      switchMap((user) => {
        this.userActual = user;
        const emailSanitizado = user?.email?.toLowerCase().replace(/\./g, '(dot)') || '';
        if (!emailSanitizado) return of(null);
        return this.authService.getDatosUsuario(emailSanitizado);
      })
    ).subscribe((usuario: Usuario | null) => {
      if (usuario && usuario.contactos && usuario.contactos.length > 0) {
        let primerContacto = true;
        usuario.contactos.forEach(contactoEmail => {
          const contactoSanitizado = contactoEmail.toLowerCase().replace(/\./g, '(dot)');
          this.authService.getDatosUsuario(contactoSanitizado).subscribe((contacto: any) => {
            const nuevoContacto = {
              nombre: `${contacto.nombre} ${contacto.apellido}`,
              estado: contacto.estado || 'Este usuario no tiene estado definido',
              avatarUrl: contacto.url || 'https://via.placeholder.com/100'
            };
            this.contactos.push(nuevoContacto);
            if (primerContacto) {
              // Inicialmente, mostramos el primer contacto en la sección mini.
              this.miNombreMini = nuevoContacto.nombre;
              this.miAvatarUrlMini = nuevoContacto.avatarUrl;
              primerContacto = false;
            }
          });
        });
      }
    });

    // Recuperar la lista completa de grupos creados
    this.authService.getDatosGrupo('defaultGroupName').subscribe({
      next: (grupo: Grupo) => {
        this.grupos = [grupo];
        console.log('Grupos recuperados:', this.grupos);
      },
      error:   (error) => {
        console.error('Error al obtener grupos:', error);
      }
    });
  }
}
