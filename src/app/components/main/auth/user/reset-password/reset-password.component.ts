import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../../_services/user.service';

import { UniqueQuestion } from '../../../../../_models/unique-question.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  showResetPasswordButton: boolean = false;
  showCheckUserButton: boolean = true;
  showSuccessMessage: boolean = false;
  buttonType: string;
  serverErrorMessages: string;
  uniqueQuestion: UniqueQuestion = {
    UniqueQuestionId: NaN,
    Question: '',
  };

  constructor(public userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('-> button type:', this.buttonType);
    if (this.buttonType === 'checkuser') {
      this.userService.checkUser(form.value).subscribe(
        (res: any) => {
          console.log('-> checkUser res:', res);
          this.uniqueQuestion.Question = res.data.UniqueQuestion;
          this.showResetPasswordButton = true;
          this.showCheckUserButton = false;
          this.userService.selectedUser.UserId = res.data.UserId;
        },
        (err) => {
          this.showSuccessMessage = false;
          if (
            err.error.code === 409 ||
            err.error.code === 400 ||
            err.error.code === 500 ||
            err.error.code === 403
          ) {
            this.serverErrorMessages = err.error.message;
          } else {
            this.serverErrorMessages =
              'Something went wrong. Please contact admin';
          }
          console.log('-> error:', err);
        }
      );
    } else if (this.buttonType === 'resetpassword') {
      const data = {
        ...form.value,
        UserId: this.userService.selectedUser.UserId,
      };
      this.userService.resetPassword(data).subscribe(
        (res: any) => {
          console.log('-> reset password res:', res);
          this.showSuccessMessage = true;
          this.serverErrorMessages = '';
          setTimeout(() => this.router.navigate(['/user/signin']), 2000);
          this.resetForm(form);
        },
        (err) => {
          this.showSuccessMessage = false;
          if (
            err.error.code === 409 ||
            err.error.code === 400 ||
            err.error.code === 500 ||
            err.error.code === 403
          ) {
            this.serverErrorMessages = err.error.message;
          } else {
            this.serverErrorMessages =
              'Something went wrong. Please contact admin';
          }
          console.log('-> error:', err);
        }
      );
    }
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

  ngOnInit(): void {}
}
