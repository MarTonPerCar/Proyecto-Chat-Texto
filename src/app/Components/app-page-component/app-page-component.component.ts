import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConversationComponent } from '../conversation/conversation.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { Grupo } from '../../interfaces/grupo.interfaces';
import { User } from '@angular/fire/auth';
import { Imagen } from '../../interfaces/imagenes.interfaces';
import { switchMap, of, Observable, from, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { arrayRemove, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-app-page-component',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    ConversationComponent,
    AvatarComponent,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './app-page-component.component.html',
  styleUrl: './app-page-component.component.css'
})
export class AppPageComponentComponent implements OnInit, OnDestroy {
  contactos: any[] = [];
  grupos: Grupo[] = [];

  userActual: User | null = null;

  miAvatarUrlMini = '';
  miNombreMini = 'Usuario';
  contactouid: string = '';

  datosImagenAddContanct$: Observable<Imagen | null> = of(null);
  datosImagenAddGroup$: Observable<Imagen | null> = of(null);
  datosImagenDeleteContact$: Observable<Imagen | null> = of(null);

  modoEliminarActivo: boolean = false;
  selectedIndex: number | null = null;
  selectedGrupoIndex: number | null = null;

  private subscripciones: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.datosImagenAddContanct$ = this.authService.getImg("addContact");
    this.datosImagenAddGroup$ = this.authService.getImg("addGroup");
    this.datosImagenDeleteContact$ = this.authService.getImg("borrar");
    this.cargarContactosYGrupos();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(sub => sub.unsubscribe());
  }

  cargarContactosYGrupos() {
    this.contactos = [];
    this.grupos = [];
    this.selectedIndex = null;
    this.selectedGrupoIndex = null;

    const sub = this.authService.user$.pipe(
        switchMap(user => {
          this.userActual = user;
          const uid = user?.uid || '';
          if (!uid) return of(null);
          return this.authService.getDatosUsuarioPorUID(uid);
        })
    ).subscribe((usuario: Usuario | null) => {
      if (!usuario) return;

      // Contactos
      usuario.contactos?.forEach(contactoUid => {
        this.authService.getDatosUsuarioPorUID(contactoUid).subscribe(contacto => {
          const yaExiste = this.contactos.some(c => c.uid === contactoUid);
          if (!yaExiste) {
            const nuevoContacto = {
              nombre: `${contacto.nombre} ${contacto.apellido}`,
              estado: contacto.estado || 'Este usuario todavía no tiene un estado definido',
              avatarUrl: contacto.url,
              uid: contactoUid
            };
            this.contactos.push(nuevoContacto);
            if (this.contactos.length === 1) {
              this.miNombreMini = nuevoContacto.nombre;
              this.miAvatarUrlMini = nuevoContacto.avatarUrl;
              this.contactouid = contactoUid;
            }
          }
        });
      });

      // Grupos
      usuario.grupos?.forEach(gid => {
        this.authService.getDatosGrupo(gid).pipe(
            catchError(() => of(null))
        ).subscribe(grupo => {
          if (grupo && !this.grupos.some(g => g.gid === grupo.gid)) {
            this.grupos.push(grupo);
          }
        });
      });
    });

    this.subscripciones.push(sub);
  }

  activarModoEliminar() {
    this.modoEliminarActivo = !this.modoEliminarActivo;
  }

  seleccionarUsuario(contacto: any, index: number) {
    if (this.modoEliminarActivo) {
      Swal.fire({
        title: '¿Eliminar este contacto?',
        text: `Se eliminará a ${contacto.nombre} de tus contactos.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarContacto(contacto, index);
        }
      });
    } else {
      this.selectedIndex = index;
      this.selectedGrupoIndex = null;
      this.miAvatarUrlMini = contacto.avatarUrl;
      this.miNombreMini = contacto.nombre;
      this.contactouid = contacto.uid;
    }
  }

  seleccionarGrupo(grupo: Grupo, index: number) {
    if (this.modoEliminarActivo) {
      Swal.fire({
        title: '¿Salir de este grupo?',
        text: `Ya no formarás parte de "${grupo.nombre}".`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarGrupo(grupo, index);
        }
      });
    } else {
      this.selectedGrupoIndex = index;
      this.selectedIndex = null;
      this.miAvatarUrlMini = grupo.url;
      this.miNombreMini = grupo.nombre;
    }
  }

  eliminarGrupo(grupo: Grupo, index: number) {
    if (!this.userActual) return;

    const miUid = this.userActual.uid;
    const userRef = doc(this.authService.firestore, `usuarios/${miUid}`);
    const grupoRef = doc(this.authService.firestore, `grupos/${grupo.gid}`);

    from(updateDoc(userRef, {
      grupos: arrayRemove(grupo.gid)
    }))
        .pipe(
            switchMap(() =>
                this.authService.getDatosGrupo(grupo.gid).pipe(
                    catchError(() => of(null))
                )
            ),
            switchMap(grupoActual => {
              if (!grupoActual) return of(null);
              const nuevosContactos = grupoActual.contactos.filter(uid => uid !== miUid);
              if (nuevosContactos.length === 0) {
                return from(deleteDoc(grupoRef));
              }
              return from(updateDoc(grupoRef, { contactos: nuevosContactos }));
            })
        )
        .subscribe({
          next: () => {
            if (!this.modoEliminarActivo) return;

            Swal.fire('¡Saliste del grupo!', '', 'success');
            this.modoEliminarActivo = false;
            this.cargarContactosYGrupos();
          },
        });
  }

  eliminarContacto(contacto: any, index: number) {
    if (!this.userActual) return;
    const miUid = this.userActual.uid;

    this.authService.deleteContacto(miUid, contacto.uid).subscribe({
      next: () => {
        this.contactos.splice(index, 1);
        this.modoEliminarActivo = false;
        Swal.fire('Eliminado!', 'El contacto ha sido eliminado.', 'success');
      },
      error: (error) => {
        console.error('Error eliminando contacto:', error);
        Swal.fire('Error', 'No se pudo eliminar el contacto.', 'error');
      }
    });
  }
}
