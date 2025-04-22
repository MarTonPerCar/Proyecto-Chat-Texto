import { Component } from '@angular/core';
import {AboutAppComponent} from '../../Components/about-app/about-app.component';
import {HeaderComponent} from '../../Components/header/header.component';
import {IndexComponent} from '../../Components/IndexComponent/IndexComponent.component';

@Component({
  selector: 'app-main-page',
  imports: [
    AboutAppComponent,
    HeaderComponent,
    IndexComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
