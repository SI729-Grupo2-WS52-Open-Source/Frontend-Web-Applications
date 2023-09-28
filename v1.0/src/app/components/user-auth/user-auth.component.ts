import { Component } from '@angular/core';
import {SignUp} from "../../models/user.model";
import {UserContentLSService} from "../../services/user-content-ls.service";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  constructor(private users: UserContentLSService) {
  }
  signUp(data: SignUp){
    console.warn(data);
    this.users.UserSignUp(data);
  }
}
