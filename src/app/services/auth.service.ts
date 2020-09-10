import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.baseUrl = environment.apiUrl;
  }

  authenticate(username, password) {
    return this.http
      .post(this.baseUrl + '/api/TokenAuth/Authenticate', {
        userNameOrEmailAddress: username,
        password: password,
        rememberClient: false,
      })
      .pipe(
        map((res: any) => {
          this.cookieService.set(
            'authToken',
            'Bearer ' + res.result.accessToken
          );

          this.cookieService.set('tenantId', '1');
        })
      );
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }
}
