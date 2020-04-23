import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../_models/login.model';
import { RegisterModel } from '../_models/register.models';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(model: LoginModel):Observable<string> {
    return this.httpClient.post<string>(
      environment.apiDomain + 'auth/sign-in',
      model
    );
  }

  register(model: RegisterModel) {
    return this.httpClient.post<string>(
      environment.apiDomain + 'inscription',
      model
    );
  }

  logout() {
    return this.httpClient.get(
      environment.apiDomain + 'seDeconnecter'
    );
  }
}
