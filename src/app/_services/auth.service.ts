import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  loggedIn() {
    return !!this.get();
  }

  logout() {
    this.remove();
  }

  get() {
    return this.cookieService.get('authToken');
  }

  remove() {
    this.cookieService.delete('authToken');
  }

  set(value: string) {
    this.cookieService.set('authToken', value);
  }
}
