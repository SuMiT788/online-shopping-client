import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../../_services';
import { AuthService } from '../../../../../_services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  showSuccessMessage: boolean = false;
  showSuccessfullLogoutMessage: boolean = false;
  showLogOutAllButton: boolean;
  serverErrorMessages: string;
  buttonType: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  myFunction() {
    const x: any = document.getElementById('signinPassword');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  onSubmit(form: NgForm) {
    console.log('-> bottonType:', this.buttonType);
    if (this.buttonType === 'signin') {
      this.userService.userSignIn(form.value).subscribe(
        (res: any) => {
          this.showSuccessMessage = true;
          setTimeout(() => (this.showSuccessMessage = false), 4000);
          this.authService.set(res.data.Token);
          this.router.navigate(['home']);
        },
        (err) => {
          this.showSuccessMessage = false;
          if (
            err.error.code === 409 ||
            err.error.code === 400 ||
            err.error.code === 500
          ) {
            this.serverErrorMessages = err.error.message;
          } else if (
            err.error.code === 403 &&
            this.showSuccessMessage === false
          ) {
            this.serverErrorMessages = err.error.message;
            this.showLogOutAllButton = true;
          } else {
            this.serverErrorMessages =
              'Something went wrong. Please contact admin';
          }
          console.log('-> error:', err);
        }
      );
    } else if (this.buttonType === 'logoutall') {
      this.serverErrorMessages = '';
      this.userService.logoutFromAllDevices(form.value).subscribe(
        (res: any) => {
          this.showSuccessfullLogoutMessage = true;
          setTimeout(() => (this.showSuccessfullLogoutMessage = false), 4000);
          this.showLogOutAllButton = false;
        },
        (err) => {
          if (
            err.error.code === 409 ||
            err.error.code === 400 ||
            err.error.code === 500
          ) {
            this.serverErrorMessages = err.error.message;
          } else if (
            err.error.code === 403 &&
            this.showSuccessMessage === false
          ) {
            this.showLogOutAllButton = true;
          } else {
            this.serverErrorMessages =
              'Something went wrong. Please contact admin';
          }
          console.log('-> error:', err);
        }
      );
    }
  }
}
