import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import {firstValueFrom} from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
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
    CommonModule,
  ]
})
export class ContactsPage{
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

    try {
      // Obtener el usuario actual
      const user = await firstValueFrom(this.authService.user$);
      if (!user?.uid) throw new Error('Usuario no autenticado');

      // Obtener los contactos desde Firestore
      const usuario = await firstValueFrom(this.authService.getDatosUsuarioPorUID(user.uid));
      const contactosUIDs = usuario.contactos || [];

      const contactos = await Promise.all(
        contactosUIDs.map(async uid => {
          const ref = doc(this.firestore, `usuarios/${uid}`);
          const snapshot = await getDoc(ref);
          const data = snapshot.data() as Usuario;
          return { ...data, uid };
        })
      );

      // Obtener los favoritos desde SQLite
      const favoritos = await this.favoritosService.getTodosFavoritos();

      // Marcar los que son favoritos
      this.contactos = contactos
        .filter(c => !!c)
        .map(c => ({
          ...c,
          esFavorito: favoritos.includes(c.uid!)
        }));

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
