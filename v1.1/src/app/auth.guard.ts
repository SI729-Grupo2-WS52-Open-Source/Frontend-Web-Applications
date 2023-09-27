import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {AdminService} from "./services/admin.service";

export class AuthGuard implements CanActivate {
  constructor(private adminService: AdminService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('admin')){
      return true;

    }

    return this.adminService.isAdminLoggedIn;
  }

}
