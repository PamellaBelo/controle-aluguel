import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { Home } from './pages/home/home';
import { authGuard } from './auth/auth-guard';
import { DefaultRegisterLayout } from './components/default-register-layout/default-register-layout';
import { GestaoDespesas } from './pages/gestao-despesas/gestao-despesas';
import { AdicionarEditar } from './pages/adicionar-editar/adicionar-editar';
import { CadastrarEditar } from './pages/cadastrar-editar/cadastrar-editar';

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
   component: Home,
//  canActivate: [authGuard]
  children: [
   {
      path: '', redirectTo: 'gestao-despesas', pathMatch: 'full' },
      { path: 'gestao de despesas', component: GestaoDespesas},
      { path: 'adicionar-editar', component: AdicionarEditar },
     // { path: 'adicionar-editar/:id', component: AdicionarEditar },
      { path: 'cadastrar-editar', component: CadastrarEditar},
  ]
},
];
