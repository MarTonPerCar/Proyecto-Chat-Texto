import { Component } from '@angular/core';
import {RegisterFormComponent} from '../../Components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
