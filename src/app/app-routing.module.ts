import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { AuthComponent } from './_components/auth/auth.component';
import { JeuComponent } from './_components/jeu/jeu.component';
import { RencontreComponent } from './_components/rencontre/rencontre.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'jeu', component: JeuComponent },
  { path: 'rencontre', component: RencontreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
