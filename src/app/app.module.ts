import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './_components/nav/nav.component';
import { HomeComponent } from './_components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbDatepickerModule, NbSelectModule, NbDialogModule, NbToastrModule, NbListModule, NbActionsModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
=======
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbSidebarModule, NbMenuModule, NbIconModule, NbButtonModule, NbDatepickerModule, NbSelectModule, NbDialogModule, NbToastrModule, NbListModule, NbActionsModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './_components/auth/auth.component';
>>>>>>> a4bacd6857af7b6eac4342cbb8d0f936883fbb88


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
<<<<<<< HEAD
=======
    AuthComponent,

  
>>>>>>> a4bacd6857af7b6eac4342cbb8d0f936883fbb88

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
<<<<<<< HEAD
    NbEvaIconsModule,
=======
    NbIconModule,
>>>>>>> a4bacd6857af7b6eac4342cbb8d0f936883fbb88
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
