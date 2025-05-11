import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { FavoritesService } from 'src/app/services/favorites.service';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonText,
    IonAvatar,
    IonButton,
    CommonModule
  ]
})
export class ContactDetailPage implements OnInit {
  contacto: Usuario | null = null;
  cargando = true;
  error: string | null = null;
  esFavorito = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private favoritosService: FavoritesService
  ) {}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');

    if (!uid) {
      this.error = 'No se recibió un UID válido.';
      this.cargando = false;
      return;
    }

    this.authService.getDatosUsuarioPorUID(uid).subscribe({
      next: async (usuario) => {
        this.contacto = { ...usuario, uid };
        this.cargando = false;
        this.esFavorito = await this.favoritosService.esFavorito(uid);
      },
      error: (err) => {
        console.error('Error al cargar contacto:', err);
        this.error = 'No se pudo cargar la información del contacto.';
        this.cargando = false;
      }
    });
  }

  async toggleFavorito() {
    if (!this.contacto?.uid) return;

    if (this.esFavorito) {
      await this.favoritosService.eliminar(this.contacto.uid);
      this.esFavorito = false;
    } else {
      await this.favoritosService.agregar(this.contacto.uid);
      this.esFavorito = true;
    }
  }
}
