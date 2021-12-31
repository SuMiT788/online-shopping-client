import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    const isLoggedIn = this.authService.loggedIn();
    if (isLoggedIn) this.router.navigate(['home']);
  }

  ngOnInit(): void {}
}
