import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { ProfilsComponent } from './_components/profils/profils.component';
import { AuthComponent } from './_components/auth/auth.component';
import { JeuComponent } from './_components/jeu/jeu.component';
import { RencontreComponent } from './_components/rencontre/rencontre.component';
import { GenreComponent } from './_components/genre/genre.component';
import { JeuPrefereComponent } from './_components/jeu-prefere/jeu-prefere.component';
import { IsAdminGuard } from './_guards/is-admin.guard';
import { MessageComponent } from './_components/message/message.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'profils', component: ProfilsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'jeu', component: JeuComponent , canActivate: [IsAdminGuard ]},
  { path: 'rencontre', component: RencontreComponent , canActivate: [IsAdminGuard ]},
  { path: 'genre', component: GenreComponent },
  { path: 'jeu-prefere', component: JeuPrefereComponent },
  { path: 'message', component: MessageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
