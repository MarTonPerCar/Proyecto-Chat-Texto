import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ],
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  email = '';
  password = '';
  nombre = '';
  apellido = '';
  telefono = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async registrar() {
    this.cargando = true;

    this.authService.register(
      this.email,
      this.password,
      this.nombre,
      this.apellido,
      this.telefono
    ).subscribe({
      next: async () => {
        this.cargando = false;
        const toast = await this.toastController.create({
          message: 'Usuario registrado correctamente',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        this.cargando = false;
        const toast = await this.toastController.create({
          message: 'Error al registrar usuario',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        console.error(err);
      }
    });
  }
}
