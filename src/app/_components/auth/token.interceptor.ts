import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    if(!token) {
      return next.handle(request);
    }
    let header = { "Authorization": 'Bearer ' + token.slice(1, token.length-1) };
    let clone = request.clone({setHeaders: header});
    return next.handle(clone);
  }
}
