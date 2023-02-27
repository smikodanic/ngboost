import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { JwtTokenInterceptor } from './jwtTokenInterceptor.service';
import { IsLoggedService } from './routeGuards/isLogged.service';
import { HasRoleService } from './routeGuards/hasRole.service';
import { AutologinService } from './routeGuards/autoLogin.service';


@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthService,
    CookieService,
    JwtTokenInterceptor,
    IsLoggedService,
    HasRoleService,
    AutologinService,
  ],
  exports: []
})
export class NgboostAuthModule { }
