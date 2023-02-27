import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


/**
 * Intercept every HTTP erquest.
 */
@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken: string = this.authService.getJWTtoken();
    req = req.clone({
      setHeaders: {
        Authorization: jwtToken
      }
    });
    return next.handle(req);
  }

}
