import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { ProfilsComponent } from './_components/profils/profils.component';
import { AuthComponent } from './_components/auth/auth.component';
import { JeuComponent } from './_components/jeu/jeu.component';
import { RencontreComponent } from './_components/rencontre/rencontre.component';
import { GenreComponent } from './_components/genre/genre.component';
import { JeuPrefereComponent } from './_components/jeu-prefere/jeu-prefere.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profils', component: ProfilsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'jeu', component: JeuComponent },
  { path: 'rencontre', component: RencontreComponent },
  { path: 'genre', component: GenreComponent },
  { path: 'jeu-prefere', component: JeuPrefereComponent },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
