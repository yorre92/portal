import { CookieService } from 'ngx-cookie-service';
import { Injectable, OnInit } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('X-Skip-Interceptor')) {
      const headers = request.headers.delete('X-Skip-Interceptor');
      return next.handle(request.clone({ headers }));
    } else {
      request = request.clone({
        setHeaders: {
          //Set tenant Id
          Authorization: this.auth.getToken(),
          // apply valid auth token
          // disable IE ajax request caching
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
          'If-Modified-Since': '0',
          'Abp.TenantId': '1',
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // logout user
              //   this.authenticationservice.logout();
              //   location.reload(true);
            }
          }
        }
      )
    );
  }
}
