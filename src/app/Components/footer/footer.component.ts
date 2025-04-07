import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  logoSrc: string = '';
  instagramIconSrc: string = '';

  ngOnInit(): void {
    // Ruta al logo y al icono de Instagram (adaptá si usás assets)
    this.logoSrc = 'assets/logo.png';
    this.instagramIconSrc = 'assets/icons/instagram.svg';
  }
}
