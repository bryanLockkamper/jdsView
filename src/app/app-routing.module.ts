import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
<<<<<<< HEAD
=======
import { AuthComponent } from './_components/auth/auth.component';
>>>>>>> a4bacd6857af7b6eac4342cbb8d0f936883fbb88


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
<<<<<<< HEAD
=======
  { path: 'auth', component: AuthComponent },
>>>>>>> a4bacd6857af7b6eac4342cbb8d0f936883fbb88
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
