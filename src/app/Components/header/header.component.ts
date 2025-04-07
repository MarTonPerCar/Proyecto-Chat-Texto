import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logoSrc: string = ''; // Ruta a tu logo

  constructor() {}

  ngOnInit(): void {
    // Inicialización del logo y/o lógica adicional
    this.logoSrc = 'assets/logo.png'; // Cambiá según tu estructura
  }
}
