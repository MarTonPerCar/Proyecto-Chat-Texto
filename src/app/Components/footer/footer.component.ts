import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '@angular/fire/auth';
import {Imagen} from '../../interfaces/imagenes.interfaces';
import {AuthService} from '../../services/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  user$: Observable<User | null>;
  logoSrc: string = '';
  instagramIconSrc: string = '';
  datosImagenInstagram$: Observable<Imagen | null> = of(null);
  datosImagenMainIcon$: Observable<Imagen | null> = of(null);

  constructor(private authService: AuthService,) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.datosImagenMainIcon$ = this.authService.getImg("MainIcon");
    this.datosImagenInstagram$ = this.authService.getImg("instagram");
  }
}
