import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public selectedUser: User = {
    UserId: NaN,
    Name: '',
    Email: '',
    MobileNumber: '',
    Password: '',
    NewPassword: '',
    UniqueQuestionId: NaN,
    UniqueQuestionAnswer: '',
    Role: 'User',
    IsBlocked: false,
    UniqueId: '',
  };
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get(environment.apiBaseUrl + '/viewProfile');
  }

  postUser(user: User) {
    console.log('-> signup data:', user);
    return this.http.post(environment.apiBaseUrl + '/signup', user);
  }

  userSignIn(user: User) {
    console.log('-> signin data:', user);
    return this.http.post(environment.apiBaseUrl + '/signin', user);
  }

  logoutFromAllDevices(user: User) {
    console.log('-> logoutall data:', user);
    return this.http.post(environment.apiBaseUrl + '/logoutAll', user);
  }

  checkUser(user: User) {
    console.log('-> checkUser data:', user);
    return this.http.post(environment.apiBaseUrl + '/checkUser', user);
  }

  resetPassword(user: User) {
    console.log('-> resetPassword data:', user);
    return this.http.patch(environment.apiBaseUrl + '/forgotPassword', user);
  }

  logout() {
    return this.http.delete(environment.apiBaseUrl + '/logout');
  }

  editProfile(user: User) {
    console.log('-> editProfile data:', user);
    return this.http.patch(environment.apiBaseUrl + '/editProfile', user);
  }
}
