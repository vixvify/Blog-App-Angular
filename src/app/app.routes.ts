import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Form } from './form/form';
import { Editform } from './editform/editform';
import { Login } from './login/login';
import { Register } from './register/register';
import { Single } from './single/single';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'form', component: Form },
      { path: 'editform/:id', component: Editform },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'single/:id', component: Single },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
];
