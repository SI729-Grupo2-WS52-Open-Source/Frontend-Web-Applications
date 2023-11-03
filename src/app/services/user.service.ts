import { EventEmitter, Injectable } from '@angular/core';
import { login, product, SignUp } from "../models/data-model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  baseURL = environment.baseURL; // Variable para la URL base

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    this.http.post(`${this.baseURL}/users`, user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data: login) {
    // Agregar el encabezado 'ngrok-skip-browser-warning' con cualquier valor
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    this.http.get<SignUp[]>(`${this.baseURL}/users?email=${data.email}&password=${data.password}`,
      { headers, observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  getUserProfile(payment: string) {
    return this.http.get<SignUp>(`${this.baseURL}/users/${payment}`);
  }
}
