import { Component } from '@angular/core';
import {RequestComponent} from '../../Components/request/request.component';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-login-page',
  imports: [
    RequestComponent,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  nombre: string = '';
  correo: string = '';

}
