import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Usuario } from '../../interfaces/usuario.interfaces';
import { Imagen } from '../../interfaces/imagenes.interfaces';

import { User } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
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
  datosImagenSettings$: Observable<Imagen | null> = of(null);
  datosImagenLogo$: Observable<Imagen | null> = of(null);
  datosImagenMain$: Observable<Imagen | null> = of(null);

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.datosUsuario$ = this.user$.pipe(
      switchMap(user => {
        if (user && user.uid) {
          return this.authService.getDatosUsuarioPorUID(user.uid);
        }
        return of(null);
      })
    );

    this.datosImagenSettings$ = this.authService.getImg("settings");
    this.datosImagenLogo$ = this.authService.getImg("MainIcon");
    this.datosImagenMain$ = this.authService.getImg("inicio");
  }
}
