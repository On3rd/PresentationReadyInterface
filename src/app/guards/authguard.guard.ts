import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { LoginService } from '../services/login.service';
import { LocalStorage } from 'ngx-webstorage';

@Injectable()
export class AuthguardGuard implements CanActivate {
  private role:any;
  private token:any;
  constructor(private _userLogin:LoginService)
  {
     
  }
  
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.token = JSON.parse(localStorage.getItem('token')); 
 
      
        this.role = JSON.parse(localStorage.getItem('role'));
        console.log("Auth guard user",this.role.Role)
        if(this.role.Role == "CUSTOMER" || this.role.Role == "ADMIN")
        {
          return true;
        }
      
      
    return false;
  }
}
