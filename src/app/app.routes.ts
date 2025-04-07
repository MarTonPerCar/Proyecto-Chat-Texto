import { Routes } from '@angular/router';
import {MainPageComponent} from './Pages/main-page/main-page.component';
import {LoginPageComponent} from './Pages/login-page/login-page.component';
import {RegisterPageComponent} from './Pages/register-page/register-page.component';
import {UploadImagesComponent} from './Components/upload-images/upload-images.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'uploadImages', component: UploadImagesComponent }
];
