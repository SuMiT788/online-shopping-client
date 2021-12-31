import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, DashboardService } from '../../_services';
import { ProductService } from '../../_services';
import { UserService } from '../../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public productService: ProductService,
    private authService: AuthService,
    public userService: UserService,
    public dashboardService: DashboardService
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

  onSearch(form: any) {
    const data = { ...form, PageNo: 1 };
    console.log('-> search data:', data);
    this.productService.onSearch(data);
    this.dashboardService.changeTab('products');
  }

  ngOnInit(): void {}
}
