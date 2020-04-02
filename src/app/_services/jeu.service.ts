import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jeu } from '../_models/jeu.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  private _context$: BehaviorSubject<Jeu[]>;

  public get context$(): Observable<Jeu[]> {
    return this._context$.asObservable();
  }

  constructor(private httpClient : HttpClient) 
  {
    this._context$ = new BehaviorSubject<Jeu[]>([]);
  }

  getAllJeu():void{
    this.httpClient.get<Jeu[]>(environment.apiDomain + 'jeux').subscribe(data => this._context$.next(data));
  }

  delete(j: Jeu) : Observable<Jeu> {    
    return this.httpClient
      .post<Jeu>(environment.apiDomain + 'supprimerJeu' ,  j
    ).pipe(finalize(() => this.getAllJeu()));
  }

  insert(j: Jeu): Observable<Jeu> {
    console.log(j);
    
    return this.httpClient
      .post<Jeu>(environment.apiDomain + 'creerJeu', j)
      .pipe(finalize(() => this.getAllJeu()));
  }

  update(j: Jeu) {    
    return this.httpClient
    .post<Jeu>(environment.apiDomain + 'modifierJeu' , j)
    .pipe(finalize(() => this.getAllJeu()));
  }
}
