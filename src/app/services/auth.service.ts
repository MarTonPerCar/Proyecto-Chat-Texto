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
import {firstValueFrom, from, Observable} from 'rxjs';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario.interfaces';
import { Imagen } from '../interfaces/imagenes.interfaces';
import { map } from 'rxjs/operators';

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
      const avatar = await firstValueFrom(this.getImg('avatar'));

      const usuario: Usuario = {
        nombre,
        apellido,
        telefono,
        email,
        url: avatar.url,
        estado: '',
        contactos: [],
        grupos: []
      };

      const LowerEmail = email.toLowerCase().replace(/\./g, '(dot)');
      const userRef = doc(this.firestore, `usuarios/${LowerEmail}`);

      await setDoc(userRef, usuario);
      await signOut(this.firebaseAuth);
      return Promise.resolve();
    });

    return from(promise);
  }

  // ──────────────────────────────────────────────
  // LECTURA DE DATOS DEL USUARIO EN AUTH + FIRESTORE
  // ──────────────────────────────────────────────

  getDatosUsuario(email: string): Observable<Usuario> {
    const emailSanitizado = email.toLowerCase().replace(/\./g, '(dot)');
    const userRef = doc(this.firestore, `usuarios/${emailSanitizado}`);
    console.log('[AuthService] getDatosUsuario(): email →', emailSanitizado);
    return docData(userRef) as Observable<Usuario>;
  }

  getImg(name: string): Observable<Imagen> {
    const ref = doc(this.firestore, `img/${name}`);
    return docData(ref) as Observable<Imagen>;
  }
}
