import { Injectable } from '@angular/core';
import {Navigate} from '../../app/classes/navigate';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class LoginService {

 
  private _navigate=new Navigate();
  //private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private username:any = null;
  private username_id:any = null;
  private admin_id:any;
  private paymentMethod = null;
  private user:User[];
  private _user:User;
  private baseUrl : string = 'http://localhost:8080/api';
  private header = new Headers({'Content-Type':'application/json'});
  private header2 = new Headers({'Content-Type':'text/plain'});
  private option = new RequestOptions({headers:this.header2});
  private options = new RequestOptions({headers:this.header});
  private User;
  private token:string = null;
  constructor(private _login:Router,private http:Http,public toastr: ToastrService) {

   }

   login(email,password)
   {
    this.http.get(this.baseUrl+"/userlogin/"+email +"/"+ password,this.option).subscribe(loggedInUser=>
      {
        {
          this.token=loggedInUser.text();

          if(this.token != null)
          {  
            this.setLogin(this.token);
            localStorage.setItem('token',JSON.stringify({token:this.token}));
            this.toastr.success("Login Successful");
            this._login.navigate(['/home']);

          }else
          {
            this.toastr.error("Login Unsuccessful"); 
          }
        }
        });;
     
   }
   

    errorHandler(error:Response)
    {
      return Observable.throw(error||"SERVER ERROR");
    }
  
  

  getToken()
  {
    var token = JSON.parse(localStorage.getItem('token'));
    return token.token;
  }

  setLogin(token:string)
  {
   
 //   this.loggedInStatus = login;
 
 
  this.http.get(this.baseUrl+"/username/"+token,this.options).subscribe(username=>
    {
      localStorage.setItem('currentUser',JSON.stringify({username:username.text()}));
    });

  this.http.get(this.baseUrl+"/role/"+token,this.options).subscribe(role=>
    {
        localStorage.setItem('role',JSON.stringify({Role:role.text()}));
    });

    this.http.get(this.baseUrl+"/getUserID/"+token,this.options).subscribe(user_id=>
      {
          localStorage.setItem('userId',JSON.stringify({UserId:user_id.text()
          
          
          }));
      });

      this.http.get(this.baseUrl+"/checkOwnership/"+token,this.options).subscribe(
        ownership=>
        {
          localStorage.setItem('ownership',JSON.stringify({ownership:ownership.text()}));
        }
      )
   
  }
  
  logOut()
  {
    this._navigate.setLoggedUserButton(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('ownership');
    this._login.navigate(['/']);
  }
  
  getLoggin()
  {
     
    return this._navigate.loggedUserButton;
  }
  getOwnership()
  {
    var ownership= JSON.parse(localStorage.getItem('ownership'));

    if(ownership == null)
     {
       return null;
     }
     else
     {

     return  ownership.ownership;
     
    }
  }

  getLoggedInUser()
  {
     var username= JSON.parse(localStorage.getItem('currentUser'))
     if(username == null)
     {
       return null;
     }
     else{
      this._navigate.setLoggedUserButton(true);
     return this.username = username.username;
  
     }
  }
  getPaymentMethod()
  {
    var paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));
    if(paymentMethod == null)
     {
       return false;
     }
     else{
     return true;
   
     }
  }
  getRole()
  {
     var Role= JSON.parse(localStorage.getItem('Role'))
     if(Role == null)
     {
       return null;
     }
     else{
     return Role.Role;
   
     }
  }
  getLoggedInUserID()
  {
     var user_id= JSON.parse(localStorage.getItem('userId'));
     if(user_id == null)
     {
       return null;
     }
     else{
     return this.username_id = user_id.UserId;
   
     }
  }
}
