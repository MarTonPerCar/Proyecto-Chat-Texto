import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '@angular/fire/auth';
import {Observable} from 'rxjs';
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
export class HeaderComponent {
  user$: Observable<User | null>;

  // Rutas de imágenes o íconos
  logoSrc = 'assets/images/logo.png';
  inicioIcon = 'assets/icons/home.png';
  configIcon = 'assets/icons/settings.png';
  avatarSrc = 'assets/images/default-avatar.png';

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
