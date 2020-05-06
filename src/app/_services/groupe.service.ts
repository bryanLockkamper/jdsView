import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Jeu} from "../_models/jeu.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Groupe} from "../_models/utilisateur.model";
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private _context$: BehaviorSubject<Groupe[]>;

  public get context$(): Observable<Groupe[]> {
    return this._context$.asObservable();
  }

  constructor(private httpClient : HttpClient)
  {
    this._context$ = new BehaviorSubject<Groupe[]>([]);
  }

  getAllGroupe():void{
    this.httpClient.get<Groupe[]>(environment.apiDomain + 'utilisateur/' + decode(localStorage.getItem('token')).userInfo.id + '/groupes').subscribe(data => this._context$.next(data));
  }
}
