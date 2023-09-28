import { Component,OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";
import {SignUp} from "../../models/data-model";

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {

  constructor(private admin: AdminService, private router: Router) {
  }

  ngOnInit(){
    this.admin.reloadAdmin();
  }
  signUp(data: SignUp): void{
    this.admin.userSignUp(data);
  }
}
