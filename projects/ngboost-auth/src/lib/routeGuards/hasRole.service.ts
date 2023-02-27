import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


/**
 * Check if user has required role: admin, customer. If not redirect to /login page.
 */
@Injectable()
export class HasRoleService {

  constructor(
    private authService: AuthService,
    private r: Router,
    @Inject('AUTH_URLS') private auth_urls: any, // {afterGoodLogin: , afterBadLogin: , afterLogout: }
  ) { }


  canActivate(ars: ActivatedRouteSnapshot, rss: RouterStateSnapshot) {

    // get loggedUser info after successful username:password login
    const loggedUser = this.authService.getLoggedUserInfo();
    // console.log('GUARD::hasRole:loggedUser: ', loggedUser);

    // get current URL and check if user's role (admin, customer) is contained in it
    const currentUrl = rss.url; // '/admin/dashboard'
    // console.log('GUARD::hasRole:currentUrl: ', currentUrl);

    let tf = false;
    if (loggedUser) {
      tf = currentUrl.indexOf(loggedUser.role) !== -1;
    }

    if (!tf) {
      this.r.navigateByUrl(this.auth_urls.afterBadLogin);
      console.error(new Error('Guard blocks this route because user doesn\'t have good role. Redirection to /login page.'));
    }

    return tf;
  }


}
