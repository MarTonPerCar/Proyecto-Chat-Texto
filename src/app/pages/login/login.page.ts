import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonInput,

} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [
    IonContent,
    IonInput,
    FormsModule,
    IonButton,
  ],
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  email = '';
  password = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.authService.logout().subscribe(() => {
      console.log('Sesión cerrada automáticamente al volver al login.');
    });
  }

  async login() {
    this.cargando = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/contacts']); // redirige después de iniciar sesión
      },
      error: async (err) => {
        this.cargando = false;
        const toast = await this.toastController.create({
          message: 'Credenciales inválidas',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        console.error(err);
      }
    });
  }
}
