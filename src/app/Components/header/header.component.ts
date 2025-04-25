import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Usuario } from '../../interfaces/usuario.interfaces';
import { Imagen } from '../../interfaces/imagenes.interfaces';

import {User} from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null>;
  datosUsuario$: Observable<Usuario | null> = of(null);
  datosImagen$: Observable<Imagen | null> = of(null);

  // Rutas de imágenes o íconos
  logoSrc = 'assets/images/logo.png';
  inicioIcon = 'assets/icons/home.png';
  configIcon = 'assets/icons/settings.png';
  avatarSrc = 'assets/images/default-avatar.png';

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.datosUsuario$ = this.user$.pipe(
      switchMap(user => {
        if (user && user.email) {
          return this.authService.getDatosUsuario(user.email);
        }
        return of(null);
      })
    );

    this.datosImagen$ = this.authService.getImg("settings");
  }
}
