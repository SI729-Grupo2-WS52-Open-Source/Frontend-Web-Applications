import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {SignUp} from "../../models/user.model";
@Component({
  selector: 'app-register-content',
  templateUrl: './register-content.component.html',
  styleUrls: ['./register-content.component.css']
})
export class RegisterContentComponent {
  constructor(private user: UserService, private router: Router) {
  }
  showLogin = false;
  authError: string = '';

  ngOnInit(): void{
    this.user.reloadUser();
  }
  signUp(data: SignUp): void{
    this.user.userSignUp(data);
  }

  login(data: SignUp){
    this.authError ="";
   // console.warn(data);
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((e) => {
      if (e){
        this.authError="Email or password is not correct";
      }
    })
  }
  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
  }

}
