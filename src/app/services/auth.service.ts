import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  User,
  createUserWithEmailAndPassword,
  UserCredential
} from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

export interface Usuario {
  uid?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private firebaseAuth: Auth,
    private firestore: Firestore
  ) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  // ────────────────────────────────
  // LÓGICA DE AUTENTICACIÓN
  // ────────────────────────────────

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {
      //
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      sessionStorage.clear();
    });
    return from(promise);
  }

  // ──────────────────────────────────────────────
  // CREACIÓN DE USUARIO EN AUTH + FIRESTORE
  // ──────────────────────────────────────────────

  register(
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    telefono: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(async (credenciales: UserCredential) => {
      const uid = credenciales.user.uid;

      const usuario: Usuario = {
        uid,
        nombre,
        apellido,
        telefono,
        email,
        url: this.generarUrlUnica()
      };

      const userRef = doc(this.firestore, `usuarios/${uid}`);
      await setDoc(userRef, usuario);
      await signOut(this.firebaseAuth);
      return Promise.resolve();
    });

    return from(promise);
  }

  private generarUrlUnica(): string {
    return 'url-' + Math.random().toString(36).substring(2, 10);
  }
}
