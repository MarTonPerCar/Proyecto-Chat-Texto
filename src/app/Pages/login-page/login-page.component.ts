import { Component, NgZone } from '@angular/core';
import { LoginFormComponent } from '../../Components/login-form/login-form.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, HeaderComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private logsRef;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    this.logsRef = collection(this.firestore, 'auth_logs');
  }

  async login(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form['email'] as HTMLInputElement).value?.trim();
    const password = (form['password'] as HTMLInputElement).value?.trim();

    console.log('Intentando login con:', { email, password });

    if (!email || !password) {
      console.error('Email y/o contraseña no proporcionados');
      return;
    }

    // Ejecutar dentro de Angular zone para evitar problemas de change detection
    this.ngZone.run(async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        console.log('Usuario autenticado:', userCredential.user);

        // Guardar log de login en Firestore
        const docRef = await addDoc(this.logsRef, {
          uid:       userCredential.user.uid,
          email,
          action:    'login',
          timestamp: serverTimestamp()
        });
        console.log(`Log registrado en Firestore con ID: ${docRef.id}`);
      } catch (error) {
        console.error('Error al iniciar sesión o guardar log:', error);
      }
    });
  }
}
