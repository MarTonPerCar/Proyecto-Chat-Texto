import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import {Usuario} from '../../interfaces/usuario.interfaces';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  userData$!: Observable<Usuario | null>;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userData$ = this.authService.user$.pipe(
      switchMap(user => user?.uid
        ? this.authService.getDatosUsuarioPorUID(user.uid)
        : of(null)
      )
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  async changeStatus(currentEstado: string | undefined): Promise<void> {
    const newEstado = prompt('Ingresa tu nuevo estado:', currentEstado ?? '');
    if (newEstado !== null) {
      // Obtener UID y actualizar
      this.authService.user$.pipe(take(1)).subscribe(async user => {
        if (user?.uid) {
          const userRef = doc(this.firestore, `usuarios/${user.uid}`);
          await updateDoc(userRef, {estado: newEstado});
        }
      });
    }
  }
}
