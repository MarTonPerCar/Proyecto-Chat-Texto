import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {LoggedInHeaderComponent} from '../../Components/logged-in-header/logged-in-header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppPageComponentComponent } from '../../Components/app-page-component/app-page-component.component';

@Component({
  selector: 'app-app-page',
  imports: [
    LoggedInHeaderComponent,
    RouterModule,
    CommonModule,
    NgIf,
    AppPageComponentComponent,
    AppPageComponentComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.css'
})
export class AppPageComponent {

}
