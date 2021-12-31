import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../../_services';
import { User } from '../../../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: User;
  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {
    const isLoggedIn = this.authService.loggedIn();
    if (isLoggedIn && !userService.selectedUser.UserId)
      this.userService.getUserInfo().subscribe(
        (res: any) => {
          this.userService.selectedUser = res.data;
          this.user = res.data;
        },
        (err) => {
          console.log('-> userInfo err:', err);
        }
      );
  }

  editProfile() {
    this.userService.editProfile(this.user).subscribe(
      (res) => {
        console.log('-> editProfile res:', res);
        this.userService.selectedUser.Name = this.user.Name;
        this.userService.selectedUser.Email = this.user.Email;
        this.userService.selectedUser.MobileNumber = this.user.MobileNumber;
      },
      (err) => {
        console.log('-> editProfile err:', err);
        alert(err.error.message);
      }
    );
  }

  ngOnInit(): void {}
}
