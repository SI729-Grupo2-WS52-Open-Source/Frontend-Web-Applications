import {EventEmitter, Injectable} from '@angular/core';
import {login, product, SignUp} from "../models/data-model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp){
    this.http.post(`${this.baseUrl}/users`, user, {observe: 'response'})
      .subscribe((result) => {
        console.warn(result);
        if (result){
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data: login){
    this.http.get<SignUp[]>(`${this.baseUrl}/users?email=${data.email}&password=${data.password}`,
      {observe: 'response'})
      .subscribe((result) => {
        if (result && result.body?.length){
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }else {
          this.invalidUserAuth.emit(true);
        }
      })
  }
  userAuthReload(){
    if (localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  getUserProfile(payment: string) {
    return this.http.get<SignUp>(`${this.baseUrl}/users/${payment}`);
  }
}
