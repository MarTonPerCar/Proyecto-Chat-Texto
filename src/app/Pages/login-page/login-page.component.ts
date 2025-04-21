import { Component } from '@angular/core';
import {LoginFormComponent} from '../../Components/login-form/login-form.component';
import {HeaderComponent} from '../../Components/header/header.component';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginFormComponent,
    HeaderComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
