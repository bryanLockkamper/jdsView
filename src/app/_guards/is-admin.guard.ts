import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  token : string[];

  constructor(private router: Router) {

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.token = decode(localStorage.getItem('token')).roles;
      
      if(this.token.includes("Admin")){

        return true;
      }
      else if(!this.token.includes("Admin")){
        this.router.navigateByUrl('/auth');
      }
      return false;
  }
  
}
