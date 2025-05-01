import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppPageComponentComponent } from '../../Components/app-page-component/app-page-component.component';

@Component({
  selector: 'app-app-page',
  imports: [
    RouterModule,
    CommonModule,
    AppPageComponentComponent,
    AppPageComponentComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.css'
})
export class AppPageComponent {

}
