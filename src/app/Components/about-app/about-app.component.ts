import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Imagen} from '../../interfaces/imagenes.interfaces';
import {AuthService} from '../../services/auth.service';
import {User} from '@angular/fire/auth';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-about-app',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './about-app.component.html',
  styleUrl: './about-app.component.css'
})
export class AboutAppComponent implements OnInit {
  user$: Observable<User | null>;
  datosImagenFullLogo$: Observable<Imagen | null> = of(null);

  constructor(private authService: AuthService,) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.datosImagenFullLogo$ = this.authService.getImg("fullLogo");
  }
}
