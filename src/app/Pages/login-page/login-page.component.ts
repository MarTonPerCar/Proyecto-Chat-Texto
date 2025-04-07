import {Component, OnInit} from '@angular/core';
import {RequestComponent} from '../../Components/request/request.component';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from "../../Components/header/header.component";


@Component({
  selector: 'app-login-page',
    imports: [
        RequestComponent,
        FormsModule,
        HeaderComponent
    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  miFormulario: FormGroup = new FormGroup({});
  nombre: string = "";
  correo: string = "";

  ngOnInit() {
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
