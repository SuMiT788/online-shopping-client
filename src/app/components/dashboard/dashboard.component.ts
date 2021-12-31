import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import {
  ProductService,
  UserService,
  DashboardService,
  AuthService,
} from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // modal & loading
  quantity: any = {};
  environment = environment;

  constructor(
    public productService: ProductService,
    public dashboardService: DashboardService,
    public userService: UserService,
    public authService: AuthService
  ) {
    const isLoggedIn = this.authService.loggedIn();
    if (isLoggedIn && !userService.selectedUser.UserId)
      this.userService.getUserInfo().subscribe(
        (res: any) => {
          this.userService.selectedUser = res.data;
          console.log('-> userName:', this.userService.selectedUser.Name);
        },
        (err) => {
          console.log('-> userInfo err:', err);
        }
      );
  }

  ngOnInit(): void {}

  userLogout() {
    this.userService.logout().subscribe(
      (res) => {
        console.log('-> logout res:', res);
        this.authService.logout();
      },
      (err) => {
        console.log('-> logout err:', err);
      }
    );
  }
}
