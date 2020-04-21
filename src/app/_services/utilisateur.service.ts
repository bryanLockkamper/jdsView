import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../_models/utilisateur.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getMonProfil(id:number):Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(
      environment.apiDomain + 'utilisateur/'+id
    );
  }
  getSaveMonProfil(utilisateur: Utilisateur){
    return this.httpClient.post(
      environment.apiDomain + '/modifierUtilisateur',utilisateur
    );
  }
}
