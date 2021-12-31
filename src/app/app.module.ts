// built-in
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/main/auth/user/user.component';
import { SignUpComponent } from './components/main/auth/user/sign-up/sign-up.component';
import { SignInComponent } from './components/main/auth/user/sign-in/sign-in.component';
// routes
import { appRoutes } from './app.routing';
import { ResetPasswordComponent } from './components/main/auth/user/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WishlistComponent } from './components/dashboard/wishlist/wishlist.component';
import { CartComponent } from './components/dashboard/cart/cart.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
// interceptors
import { ErrorInterceptor } from './_helpers';
import { BasicAuthInterceptor } from './_helpers';
import { ProductsComponent } from './components/dashboard/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    DashboardComponent,
    NavbarComponent,
    WishlistComponent,
    CartComponent,
    ProfileComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
