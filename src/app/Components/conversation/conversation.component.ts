import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  standalone: true,
})
export class ConversationComponent {
  @Input() nombre: string = 'Nombre Usuario';
  @Input() estado: string = 'Estado del usuario';
  @Input() avatarUrl: string = '';

  seleccionado: boolean = false;

  seleccionarConversacion() {
    console.log('hola');
    this.seleccionado = true;
  }
}
