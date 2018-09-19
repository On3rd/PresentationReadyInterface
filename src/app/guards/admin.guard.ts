import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
  private role:any;

  constructor(private _adminLogin:LoginService)
  {

  }
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      
      var token = JSON.parse(localStorage.getItem('token')); 
      
      if(token != null){
        this.role = JSON.parse(localStorage.getItem('role'));
        if(this.role.Role == "ADMIN")
        {
          return true;
        }
      }
      
    return false;
  }
}
