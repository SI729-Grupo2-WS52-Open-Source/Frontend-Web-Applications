import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Injectable} from "@angular/core";
import {UserService} from "./services/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private userService: UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('user')){
      return true;
    }
    return this.userService.isUserLoggedIn;
  }
}
