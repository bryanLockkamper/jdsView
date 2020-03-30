import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Genre } from '../_models/genre.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private _context$: BehaviorSubject<Genre[]>;

  public get context$(): Observable<Genre[]> {
    return this._context$.asObservable();
  }

  constructor(private httpClient : HttpClient) 
  {
    this._context$ = new BehaviorSubject<Genre[]>([]);
  }

  getAllGenre():void{
    this.httpClient.get<Genre[]>(environment.apiDomain + 'genres').subscribe(data => this._context$.next(data));
  }

  delete(g: Genre) : Observable<Genre> {    
    return this.httpClient
      .post<Genre>(environment.apiDomain + 'supprimerGenre' ,  g
    ).pipe(finalize(() => this.getAllGenre()));
  }

  insert(g: Genre): Observable<Genre> {
    return this.httpClient
      .post<Genre>(environment.apiDomain + 'creerGenre', g)
      .pipe(finalize(() => this.getAllGenre()));
  }

  update(g: Genre) {    
    return this.httpClient
    .post<Genre>(environment.apiDomain + 'modifierGenre' , g)
    .pipe(finalize(() => this.getAllGenre()));
  }
}
