import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './_components/nav/nav.component';
import {HomeComponent} from './_components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbSidebarModule,
  NbMenuModule,
  NbButtonModule,
  NbDatepickerModule,
  NbSelectModule,
  NbDialogModule,
  NbToastrModule,
  NbListModule,
  NbActionsModule,
  NbIconModule,
  NbTabsetModule, NbRouteTabsetModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfilsComponent} from './_components/profils/profils.component';
import {AuthComponent} from './_components/auth/auth.component';
import {JeuComponent} from './_components/jeu/jeu.component';
import {GenreComponent} from './_components/genre/genre.component';
import {RencontreComponent} from './_components/rencontre/rencontre.component';
import {SharedModule} from './_shared/shared.module';
import {AddRencontreComponent} from './_components/rencontre/add-rencontre/add-rencontre.component';
import {JeuPrefereComponent} from './_components/jeu-prefere/jeu-prefere.component';
import {TokenInterceptor} from "./_components/auth/token.interceptor";
import {NbPasswordAuthStrategy, NbAuthModule} from '@nebular/auth';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfilsComponent,
    AuthComponent,
    JeuComponent,
    GenreComponent,
    RencontreComponent,
    AddRencontreComponent,
    JeuPrefereComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbListModule,
    NbActionsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    NbTabsetModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          baseEndpoint: 'http://localhost:8080',
          login: {
            endpoint: '/auth/sign-in',
            method: 'post',
          },
          register: {
            endpoint: '/auth/sign-up',
            method: 'post',
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {},
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
