import {Component, HostBinding, Input} from '@angular/core';
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
  @Input() uid: string = '';
  @HostBinding('class.selected') isSelected: boolean = false;

  seleccionado: boolean = false;

  seleccionarConversacion() {
    this.seleccionado = true;
  }
}
