import { Component } from '@angular/core';

@Component({
  selector: 'app-about-app',
  imports: [],
  templateUrl: './about-app.component.html',
  styleUrl: './about-app.component.css'
})
export class AboutAppComponent {
  logoSrc: string = '';

  ngOnInit(): void {
    this.logoSrc = 'assets/fullLogo.png'; // Cambiá la ruta si el logo está en otro lado
  }
}
