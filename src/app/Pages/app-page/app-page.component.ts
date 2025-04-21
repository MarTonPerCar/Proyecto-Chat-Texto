import { Component } from '@angular/core';
import {LoggedInHeaderComponent} from '../../Components/logged-in-header/logged-in-header.component';

@Component({
  selector: 'app-app-page',
  imports: [
    LoggedInHeaderComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.css'
})
export class AppPageComponent {

}
