import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonRouterLink} from '@ionic/angular/standalone';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonRouterLink, RouterModule],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
