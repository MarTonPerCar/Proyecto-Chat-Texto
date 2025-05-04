import { Component } from '@angular/core';
import {ProfileDetailsComponent} from '../../Components/profile-details/profile-details.component';

@Component({
  selector: 'app-user-info-page',
  imports: [
    ProfileDetailsComponent
  ],
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent {

}
