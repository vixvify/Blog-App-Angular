import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Form } from './form/form';
import { Editform } from './editform/editform';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'form', component: Form },
  { path: 'editform/:id', component: Editform },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
