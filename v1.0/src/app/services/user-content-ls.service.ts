import { Injectable } from '@angular/core';
import {SignUp} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserContentLSService {

  constructor(private http: HttpClient, private router: Router) { }

  UserSignUp(user: SignUp){
    this.http.post(`http://localhost:3000/users`,user, {observe: 'response'})
      .subscribe((result) => {
        console.warn(result);
        if(result){
          localStorage.setItem('user',JSON.stringify(result.body));
          this.router.navigate(['/home']);
        }
    })
  }
}
