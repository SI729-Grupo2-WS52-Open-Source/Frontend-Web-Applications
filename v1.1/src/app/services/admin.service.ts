import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUp} from "../models/data-model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp){
    this.http.post('http://localhost:3000/admin',
      data,
      {observe: 'response'}
    ).subscribe((result) => {
      this.isAdminLoggedIn.next(true);
      localStorage.setItem('admin', JSON.stringify(result.body));
      this.router.navigate(['admin-home']);
    });
  }
  reloadAdmin(){
    if (localStorage.getItem('admin')){
      this.isAdminLoggedIn.next(true);
      this.router.navigate(['admin-home']);

    }
  }
}
