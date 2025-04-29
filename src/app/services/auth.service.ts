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
import { firstValueFrom, from, Observable, of } from 'rxjs';
import {
  Firestore,
  doc,
  setDoc,
  docData,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
  arrayRemove
} from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario.interfaces';
import { Imagen } from '../interfaces/imagenes.interfaces';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private firebaseAuth: Auth,
    public firestore: Firestore
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
    ).then(() => {});
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

      const userRef = doc(this.firestore, `usuarios/${credenciales.user.uid}`);
      await setDoc(userRef, usuario);
      await signOut(this.firebaseAuth);
      return Promise.resolve();
    });

    return from(promise);
  }

  // ──────────────────────────────────────────────
  // LECTURA DE DATOS DEL USUARIO EN AUTH + FIRESTORE
  // ──────────────────────────────────────────────

  getDatosUsuarioPorUID(uid: string): Observable<Usuario> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return docData(userRef) as Observable<Usuario>;
  }

  buscarUsuarioPorEmail(email: string): Observable<Usuario | null> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email.toLowerCase()));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (snapshot.empty) {
          return null;
        }
        const docSnap = snapshot.docs[0];
        return docSnap.data() as Usuario;
      })
    );
  }

  getImg(nombre: string): Observable<Imagen> {
    const imgRef = doc(this.firestore, `img/${nombre}`);
    console.log('[AuthService] getImg(): ref →', imgRef);
    return docData(imgRef) as Observable<Imagen>;
  }

  getDatosUsuarioPorUid(uid: string): Observable<Usuario> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    console.log('[AuthService] getDatosUsuarioPorUid(): uid →', uid);
    return docData(userRef) as Observable<Usuario>;
  }


  // ──────────────────────────────────────────────
  // EDICIÓN DE DATOS DEL USUARIO EN AUTH + FIRESTORE
  // ──────────────────────────────────────────────

  addContacto(uidUsuario: string, emailContacto: string) {
    const userRef = doc(this.firestore, `usuarios/${uidUsuario}`);
    return from(updateDoc(userRef, {
      contactos: arrayUnion(emailContacto)
    }));
  }

  deleteContacto(uidUsuario: string, uidContacto: string) {
    const userRef = doc(this.firestore, `usuarios/${uidUsuario}`);
    return from(updateDoc(userRef, {
      contactos: arrayRemove(uidContacto)
    }));
  }
}
