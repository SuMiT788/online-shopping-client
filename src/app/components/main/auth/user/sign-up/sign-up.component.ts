import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../../_services/user.service';
import { UniqueQuestionService } from '../../../../../_services/unique-question.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService, UniqueQuestionService],
})
export class SignUpComponent implements OnInit {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  password: string = '';
  confirmPassword: string;
  passwordRegex: string = `/${this.password}/`;

  constructor(
    public userService: UserService,
    public uniqueQuestionService: UniqueQuestionService,
    private router: Router
  ) {
    setInterval(function () {
      console.log('-> UniqueQuestionId:', userService.selectedUser);
    }, 5000);
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log('-> user data:', this.userService.selectedUser);
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/user/signin']);
        }, 1000);
        this.resetForm(form);
      },
      (err) => {
        if (err.error.code === 409) {
          this.serverErrorMessages = err.error.message;
        } else if (err.error.code === 400 || err.error.code === 500) {
          this.serverErrorMessages = err.error.message;
        } else {
          this.serverErrorMessages =
            'Something went wrong. Please contact admin';
        }
      }
    );
  }

  assignPassword(event: any) {
    this.password = event.target.value;
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
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
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
