import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoggedInHeaderComponent } from '../logged-in-header/logged-in-header.component';
import { ConversationComponent } from '../conversation/conversation.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
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
  contactos: any[] = [];
  miAvatarUrl: string = '';
  miNombre: string = 'Usuario';
  userActual: User | null = null;

  miAvatarUrlMini = '';
  miNombreMini = 'Usuario';

  constructor(private authService: AuthService) {}

  seleccionarUsuario(contacto: any) {
    this.miAvatarUrlMini = contacto.avatarUrl;
    this.miNombreMini = contacto.nombre;
  }

  ngOnInit(): void {
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
          // contactoUid ya es un UID válido

          this.authService.getDatosUsuarioPorUid(contactoUid).subscribe(contacto => {
            const nuevoContacto = {
              nombre: `${contacto.nombre} ${contacto.apellido}`,
              estado: contacto.estado || 'Este usuario todavía no tiene un estado definido',
              avatarUrl: contacto.url || 'https://via.placeholder.com/100'
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
}
