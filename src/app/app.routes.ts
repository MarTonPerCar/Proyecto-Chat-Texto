import { Routes } from '@angular/router';
import {MainPageComponent} from './Pages/main-page/main-page.component';
import {LoginPageComponent} from './Pages/login-page/login-page.component';
import {RegisterPageComponent} from './Pages/register-page/register-page.component';
import {AppPageComponent} from './Pages/app-page/app-page.component';
import {AddContactComponent} from './Components/add-contact/add-contact.component';
import {AddGroupComponentComponent} from './Components/add-group-component/add-group-component.component';
import {UserInfoPageComponent} from './Pages/user-info-page/user-info-page.component';
import {SettingsPageComponent} from './Pages/settings-page/settings-page.component';
import {EditProfilePageComponent} from './Pages/edit-profile-page/edit-profile-page.component';
import {
  ResetPasswordSettingsPageComponent
} from './Pages/reset-password-settings-page/reset-password-settings-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'chat', component: AppPageComponent },
  { path: 'addContact', component: AddContactComponent },
  { path: 'addGroup', component: AddGroupComponentComponent },
  { path: 'profile', component: UserInfoPageComponent },
  { path: 'profile/edit', component: EditProfilePageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'resetPassword', component: ResetPasswordSettingsPageComponent },
];
