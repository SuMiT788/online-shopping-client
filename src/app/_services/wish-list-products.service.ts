import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Wishlist } from '../_models/index';

@Injectable({
  providedIn: 'root',
})
export class WishListProductsService {
  wishlistArr: Wishlist[] = [];

  constructor(private http: HttpClient) {
    this.getAllWishList().subscribe(
      (res: any) => {
        if (res.message === 'Success!') {
          this.wishlistArr = res.data;
          console.log('-> wishlist products:', this.wishlistArr);
        }
      },
      (err) => {
        console.log('-> wishlist err:', err);
      }
    );
  }

  updateWishList() {
    this.getAllWishList().subscribe(
      (res: any) => {
        this.wishlistArr = res.data;
        console.log('-> wishlist products:', this.wishlistArr);
      },
      (err) => {
        console.log('-> wishlist err:', err);
      }
    );
  }

  getAllWishList() {
    return this.http.get(environment.apiBaseUrl + '/viewWishListProducts');
  }

  removeFromWishList(data: any) {
    return this.http.post(environment.apiBaseUrl + '/removeFromWishList', data);
  }
}
