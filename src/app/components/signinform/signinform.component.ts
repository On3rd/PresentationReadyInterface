import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../classes/user';
import { forEach } from '@angular/router/src/utils/collection';
import {LoginService} from '../../services/login.service';
import { CookieService } from 'angular2-cookie/core';
import {LocalStorageService,SessionStorageService} from 'ngx-webstorage';
import { ToasterService } from '../../services/toaster.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signinform',
  templateUrl: './signinform.component.html',
  styleUrls: ['./signinform.component.css']
})
export class SigninformComponent implements OnInit {
  
  constructor(public toastr:ToastrService,private _userService:UserService, private _router:Router,private _login:LoginService,private _cookieService: CookieService,private _localStorage:LocalStorageService,private _sessionStorage:SessionStorageService) {

   }

  ngOnInit() {
   
  }

  login(email:string,password:string)
  { 
     this._login.login(email,password);
  }

   
   
  }


