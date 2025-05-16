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
      const favoritosUIDs = await this.favoritosService.getTodosFavoritos();

      const favoritos = await Promise.all(
        favoritosUIDs.map(async uid => {
          try {
            const ref = doc(this.firestore, `usuarios/${uid}`);
            const snapshot = await getDoc(ref);
            if (!snapshot.exists()) return null;
            const data = snapshot.data() as Usuario;
            return { ...data, uid, esFavorito: true };
          } catch (e) {
            console.warn('Error cargando favorito:', uid, e);
            return null;
          }
        })
      );

      for (const contacto of favoritos.filter(c => !!c)) {
        mapaContactos.set(contacto!.uid, contacto!);
      }

      const user = await firstValueFrom(this.authService.user$);
      if (!user?.uid) {
        this.error = 'Usuario no autenticado';
        this.cargando = false;
        return;
      }

      const usuario = await firstValueFrom(this.authService.getDatosUsuarioPorUID(user.uid));
      const contactosUIDs = (usuario.contactos || []).filter(uid => uid.trim() !== '');

      const otrosContactos = await Promise.all(
        contactosUIDs.map(async uid => {
          try {
            if (mapaContactos.has(uid)) return null;
            const ref = doc(this.firestore, `usuarios/${uid}`);
            const snapshot = await getDoc(ref);
            if (!snapshot.exists()) return null;
            const data = snapshot.data() as Usuario;
            return { ...data, uid };
          } catch (e) {
            console.warn('Error cargando contacto UID:', uid, e);
            return null;
          }
        })
      );

      for (const contacto of otrosContactos.filter(c => !!c)) {
        mapaContactos.set(contacto!.uid, contacto!);
      }

      this.contactos = Array.from(mapaContactos.values());

    } catch (err) {
      console.error('Error al cargar contactos:', err);
      this.error = (err as Error).message || 'No se pudieron cargar los contactos.';
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
