import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem, IonLabel,
  IonList,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonText,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    CommonModule
  ]
})
export class ContactsPage {
  contactos: (Usuario & { esFavorito?: boolean })[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private favoritosService: FavoritesService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.cargarContactos();
  }

  async cargarContactos() {
    this.cargando = true;
    this.error = null;
    const mapaContactos = new Map<string, Usuario & { esFavorito?: boolean }>();

    try {
      // 1. Obtener favoritos desde SQLite
      const favoritosUIDs = await this.favoritosService.getTodosFavoritos();

      const favoritos = await Promise.all(
        favoritosUIDs.map(async uid => {
          const ref = doc(this.firestore, `usuarios/${uid}`);
          const snapshot = await getDoc(ref);
          if (!snapshot.exists()) return null;
          const data = snapshot.data() as Usuario;
          return { ...data, uid, esFavorito: true };
        })
      );

      for (const contacto of favoritos.filter(c => !!c)) {
        mapaContactos.set(contacto!.uid, contacto!);
      }

      // 2. Obtener el usuario actual y sus contactos
      const user = await firstValueFrom(this.authService.user$);
      if (!user?.uid) throw new Error('Usuario no autenticado');

      const usuario = await firstValueFrom(this.authService.getDatosUsuarioPorUID(user.uid));
      const contactosUIDs = usuario.contactos || [];

      const otrosContactos = await Promise.all(
        contactosUIDs.map(async uid => {
          if (mapaContactos.has(uid)) return null; // evitar duplicado
          const ref = doc(this.firestore, `usuarios/${uid}`);
          const snapshot = await getDoc(ref);
          if (!snapshot.exists()) return null;
          const data = snapshot.data() as Usuario;
          return { ...data, uid };
        })
      );

      for (const contacto of otrosContactos.filter(c => !!c)) {
        mapaContactos.set(contacto!.uid, contacto!);
      }

      this.contactos = Array.from(mapaContactos.values());

    } catch (err) {
      console.error('Error al cargar contactos:', err);
      this.error = 'No se pudieron cargar los contactos.';
    } finally {
      this.cargando = false;
    }
  }

  verDetalle(uid: string | undefined) {
    if (uid) {
      this.router.navigate(['/contact-detail', uid]);
    }
  }
}
