import { Injectable } from '@angular/core';
import { Rencontre } from '../_models/rencontre.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RencontreService {

  private _context$: BehaviorSubject<Rencontre[]>;

  public get context$(): Observable<Rencontre[]> {
    return this._context$.asObservable();
  }

  constructor(private httpClient : HttpClient)
  {
    this._context$ = new BehaviorSubject<Rencontre[]>([]);
  }

  getAllRencontre():void{
    this.httpClient.get<Rencontre[]>(environment.apiDomain + 'actualRencontres').subscribe(data => this._context$.next(data));
  }

  delete(g: Rencontre) : Observable<Rencontre> {
    return this.httpClient
      .post<Rencontre>(environment.apiDomain + 'supprimerRencontre' ,  g.id
    ).pipe(finalize(() => this.getAllRencontre()));
  }

  create(g: Rencontre) : Observable<Rencontre> {
    return this.httpClient
      .post<Rencontre>(environment.apiDomain + 'creerRencontre' ,  g
      ).pipe(finalize(() => this.getAllRencontre()));
  }

  modifier(g: Rencontre) : Observable<Rencontre> {
    return this.httpClient
      .post<Rencontre>(environment.apiDomain + 'modifierRencontre' ,  g
      ).pipe(finalize(() => this.getAllRencontre()));
  }
}
