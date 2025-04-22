import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {

  @Input() username: string = 'Usuario';  // Nombre por defecto
  @Input() avatarUrl: string = '';  // URL de la imagen por defecto

}
