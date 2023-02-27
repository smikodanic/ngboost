import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


/**
 * Check if user is logged and if yes do auto login e.g. redirect to afterGoodLogin URL.
 * This guard service apply only on /login route.
 */
@Injectable()
export class AutologinService {

  constructor(
    private authService: AuthService,
    private r: Router,
    @Inject('AUTH_URLS') private auth_urls: any, // {afterGoodLogin: , afterBadLogin: , afterLogout: }
  ) { }


  canActivate(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot) {
    // get loggedUser info after successful username:password login
    const loggedUser = this.authService.getLoggedUserInfo();
    // console.log('GUARD::autoLogin:loggedUser: ', loggedUser);

    const isAlreadyLogged: boolean = !!loggedUser && !!loggedUser.username;

    // redirect
    if (isAlreadyLogged) {
      const afterGoodLoginURL = this.auth_urls.afterGoodLogin.replace('{loggedUserRole}', loggedUser.role);
      this.r.navigateByUrl(afterGoodLoginURL);
    }

    return true; // always activate this route
  }


}

