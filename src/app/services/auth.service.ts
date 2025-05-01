import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
  createUserWithEmailAndPassword,
  UserCredential
} from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { firstValueFrom, from, Observable } from 'rxjs';
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
import {Grupo} from '../interfaces/grupo.interfaces';

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

  async createGroup(
      nombre: string,
      contactos: string[],
      descripcion: string,
      uidCreador: string
  ): Promise<void> {
    const avatar = await firstValueFrom(this.getImg('avatar-grupo'));
    const usuariosRef = collection(this.firestore, 'usuarios');
    const uids: string[] = [];

    for (const email of contactos) {
      const q = query(usuariosRef, where('email', '==', email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        uids.push(docSnap.id); // <-- UID real
      }
    }

    uids.push(uidCreador);

    const gid = doc(collection(this.firestore, 'grupos')).id;
    const grupo: Grupo = {
      nombre,
      contactos: uids,
      descripcion,
      gid,
      url: avatar.url
    };

    for (const uid of uids) {
      const userRef = doc(this.firestore, `usuarios/${uid}`);
      await updateDoc(userRef, {
        grupos: arrayUnion(gid)
      });
    }

    const grupoRef = doc(this.firestore, `grupos/${gid}`);
    await setDoc(grupoRef, grupo);
  }

  // ──────────────────────────────────────────────
  // LECTURA DE DATOS DEL USUARIO EN AUTH + FIRESTORE
  // ──────────────────────────────────────────────

  getDatosUsuarioPorUID(uid: string): Observable<Usuario> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return docData(userRef) as Observable<Usuario>;
  }

  getImg(nombre: string): Observable<Imagen> {
    const imgRef = doc(this.firestore, `img/${nombre}`);
    return docData(imgRef) as Observable<Imagen>;
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

  addGroup(nombreGrupo: string, descripcion: string, contactos: string[]) {
    const grupoRef = doc(this.firestore, `grupos/${nombreGrupo}`);
    return from(setDoc(grupoRef, { descripcion, contactos }, { merge: true }));
  }

  getDatosGrupo(gid: string): Observable<Grupo> {
    const grupoRef = doc(this.firestore, `grupos/${gid}`);
    return docData(grupoRef) as Observable<Grupo>;
  }
}
