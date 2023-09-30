import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {login, SignUp} from "../models/data-model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp): void{
    this.http
      .post(`${this.baseUrl}/admin`,
      data,
      {observe: 'response'}
    ).subscribe((result) => {
      this.isAdminLoggedIn.next(true);
      localStorage.setItem('admin', JSON.stringify(result.body));
      this.router.navigate(['admin-home']);
    });
  }
  reloadAdmin(): void{
    if (localStorage.getItem('admin')){
      this.isAdminLoggedIn.next(true);
      this.router.navigate(['admin-home']);

    }
  }

  userLogin(data: login){
    console.warn(data);
    this.http.get(`${this.baseUrl}/admin?email=${data.email}&password=${data.password}`,
      {observe: 'response'}
    ).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length){
        console.warn("user logged in");
        localStorage.setItem('admin', JSON.stringify(result.body));
        this.router.navigate(['admin-home']);
      }else {
        console.warn("login failed");
        this.isLoginError.emit(true);
      }
    })
  }
}
