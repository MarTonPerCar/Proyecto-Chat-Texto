import { Component } from '@angular/core';
import {LoggedInHeaderComponent} from '../../Components/logged-in-header/logged-in-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-page',
  imports: [
    RouterModule
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.css'
})
export class AppPageComponent {

}
