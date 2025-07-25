import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Home } from './pages/home/home';
import { authGuard } from './auth/auth-guard';
import { DefaultRegisterLayout } from './components/default-register-layout/default-register-layout';
import { GestaoDespesas } from './pages/gestao-despesas/gestao-despesas';
import { AdicionarEditar } from './pages/adicionar-editar/adicionar-editar';
import { CadastrarEditar } from './pages/cadastrar-editar/cadastrar-editar';
import { Unidades } from './pages/unidades/unidades';
import { Sidebar } from './components/sidebar/sidebar';

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
      ]
   },
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: '**', redirectTo: 'home' }
    
];
