import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


/**
 * Check if user is logged.
 */
@Injectable()
export class IsLoggedService {

  constructor(
    private authService: AuthService,
    private r: Router,
    @Inject('AUTH_URLS') private auth_urls: any, // {afterGoodLogin: , afterBadLogin: , afterLogout: }
  ) { }


  canActivate(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot) {

    // get loggedUser info after successful username:password login
    const loggedUser = this.authService.getLoggedUserInfo();
    // console.log('GUARD::isLogged:loggedUser: ', loggedUser);

    const isAlreadyLogged: boolean = !!loggedUser && !!loggedUser.username;

    // redirect to /login
    if (!isAlreadyLogged) {
      this.r.navigateByUrl(this.auth_urls.afterBadLogin);
      console.error(new Error('Guard blocks this route because user is not logged. Redirection to /login page.'));
    }

    return isAlreadyLogged;
  }


}
