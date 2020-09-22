import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router } from '@angular/router';
import {UserService} from '../user/user.service';
import {Injectable} from '@angular/core'

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private userservice:UserService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    const isAuth = this.userservice.getauthstatus();
    if(!isAuth){
            this.router.navigate(['/login']);
    }

    return isAuth;
    //throw new Error("Method not implemented.");
  }

}
