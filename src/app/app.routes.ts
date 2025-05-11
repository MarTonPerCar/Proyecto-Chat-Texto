import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.page').then( m => m.ContactsPage)
  },
  {
    path: 'contact-detail/:uid',
    loadComponent: () => import('./pages/contact-detail/contact-detail.page').then( m => m.ContactDetailPage)
  },
];
