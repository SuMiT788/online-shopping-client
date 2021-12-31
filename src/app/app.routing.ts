import { Routes } from '@angular/router';
import { UserComponent } from './components/main/auth/user/user.component';
import { SignUpComponent } from './components/main/auth/user/sign-up/sign-up.component';
import { SignInComponent } from './components/main/auth/user/sign-in/sign-in.component';
import { ResetPasswordComponent } from './components/main/auth/user/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './_helpers';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/user/signin',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'resetpassword', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  // otherwise show pageNotFound
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
