import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {
  @Input() nombreMini: string = '';
  @Input() avatarUrlMini: string = '';

  userActual: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userActual = user;

      if (!this.nombreMini && user) {
        this.nombreMini = user.displayName || 'Usuario';
      }

      if (!this.avatarUrlMini) {
        this.authService.getImg('avatar-contact').subscribe({
          next: (img) => {
            if (img && img.url) {
              this.avatarUrlMini = img.url;
            }
          },
        });
      }
    });
  }
}
