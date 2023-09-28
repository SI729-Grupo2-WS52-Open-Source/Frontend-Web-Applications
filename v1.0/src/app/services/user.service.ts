import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {login, SignUp} from "../models/user.model";
import {BehaviorSubject} from "rxjs";

import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: SignUp){
    this.http.post('http://localhost:3000/register',
      data,
      {observe:'response'}
        ).subscribe((result) => {
          this.isUserLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['home']);
    });
  }
  reloadUser(){
    if(localStorage.getItem('user')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['user-home']);
    }
  }
  userLogin(data: login){
    console.warn(data);
    this.http.get(`http://localhost:3000/register?email=${data.email}&password=${data.password}`,
      {observe: 'response'}
    ).subscribe((result: any) => {
      console.warn(result);
      if(result && result.body && result.body.length){
        console.warn("user logged in");
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['user-home']);
      }else{
        console.warn("login failed");
        this.isLoginError.emit(true);
      }
    });
  }
}
