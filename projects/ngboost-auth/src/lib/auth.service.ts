import { throwError, Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from './cookie.service';



// credentials interface
export interface Credentials {
  username: string;
  password: string;
}


// logged user info
export interface LoggedUser {
  first_name: string;
  last_name: string;
  address?: string;
  city?: string;
  country?: string;

  phone?: string;
  email: string;
  website?: string;

  misc?: any;

  username: string;
  password?: string;

  role: string;
  is_active?: boolean;
}



@Injectable()
export class AuthService {

  public jwtToken: string;
  private loggedUser: LoggedUser | null;
  private cookieOpts: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private r: Router,
    @Inject('AUTH_URLS') private auth_urls: any, // {apiLoginURL, afterGoodLogin, afterBadLogin, afterLogout}
  ) {
    this.cookieOpts = {
      // domain: 'localhost',
      path: '/',
      expires: 3,
      // expires: new Date('2018-10-31T03:24:00'),
      secure: false,
      httpOnly: false,
      sameSite: 'strict'
    };
  }


  /**
   * Login with username and password
   * @param creds // credentials object {username: xxx, password: xxx}
   * @return Observable
   */
  login(creds: Credentials): Observable<any> {
    return this.http.post(this.auth_urls.apiLoginUrl, creds).pipe(
      tap((apiResp: any) => {

        /* set cookie 'auth_jwtToken': 'JWT xyz...' */
        if (!!apiResp && !!apiResp.jwtToken) {
          this.cookieService.put('auth_jwtToken', apiResp.jwtToken, this.cookieOpts, false);
        }

        /* set cookie 'auth_loggedUser' and class property 'this.loggedUser': {first_name: , last_name: , ...} */
        if (!!apiResp && !!apiResp.loggedUser) {
          this.cookieService.putObject('auth_loggedUser', apiResp.loggedUser, this.cookieOpts, false);
          this.loggedUser = apiResp.loggedUser;
        }

        /* redirect to URL */
        const afterGoodLoginURL = this.auth_urls.afterGoodLogin.replace('{loggedUserRole}', apiResp.loggedUser.role);
        this.r.navigateByUrl(afterGoodLoginURL);
      }),
      catchError((err: Error) => {
        /* remove all cookies */
        this.cookieService.removeAll(false);

        /* remove loggedUser class property */
        this.loggedUser = null;

        // return error
        return throwError(() => err);
      }));

  }



  /**
   * Logout
   * @return Observable
   */
  logout(): void {
    // delete all cookies
    this.cookieService.removeAll(false);

    // delete class property
    this.loggedUser = null;

    // redirect
    setTimeout(() => {
      const afterLogoutURL = this.auth_urls.afterLogout;
      this.r.navigateByUrl(afterLogoutURL);
    }, 300);

  }


  /**
   * Get logged user info (from global variables or cookie)
   * @return object - {first_name: , last_name: , ...}
   */
  getLoggedUserInfo(): LoggedUser {
    const loggedUser: LoggedUser = this.loggedUser || this.cookieService.getObject('auth_loggedUser', false);
    return loggedUser;
  }


  /**
   * Get JWT token from cookie
   * @return string - JWT eyJhbGciOiJIUzI1NiIsInR...
   */
  getJWTtoken(): string {
    const jwtToken: string = this.cookieService.get('auth_jwtToken', false) || 'JWT ';
    return jwtToken;
  }


}
