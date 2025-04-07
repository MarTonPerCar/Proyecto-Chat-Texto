import { Component } from '@angular/core';
import {HeaderComponent} from '../../Components/header/header.component';
import {AboutAppComponent} from '../../Components/about-app/about-app.component';

@Component({
  selector: 'app-main-page',
  imports: [
    AboutAppComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
