import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Home } from './pages/home/home';
import { authGuard } from './auth/auth-guard';
import { DefaultRegisterLayout } from './components/default-register-layout/default-register-layout';


import { Unidades } from './pages/unidades/unidades';
import { Sidebar } from './components/sidebar/sidebar';
import { Novaunidade } from './pages/novaunidade/novaunidade';

export const routes: Routes = [
   {
    path :"login",
    component: Login
   },
   {
   path :"cadastro",
   component: DefaultRegisterLayout
   }, 
   {
      path: '',
      component: Sidebar, 
      children: [
        { path: 'home', component: Home },
        { path: 'unidades', component: Unidades },
        { path: 'novaunidade', loadComponent: () => import ('./pages/novaunidade/novaunidade').then(m => m.Novaunidade)}
      ]
   },
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: '**', redirectTo: 'home' }
    
];
