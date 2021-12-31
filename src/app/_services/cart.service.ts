import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartArr: Cart[] = [];
  totalCost: number = 0;

  constructor(private http: HttpClient) {
    this.getAllCartProducts().subscribe(
      (res: any) => {
        this.cartArr = res.data;
        console.log('-> cartArr:', this.cartArr);
        if (this.cartArr) {
          this.cartArr.forEach((product) => {
            this.totalCost += product['Product.Price'] * product.Quantity;
          });
        }
      },
      (err) => {
        console.log('-> getCart err:', err);
      }
    );
  }

  getAllCartProducts() {
    return this.http.get(environment.apiBaseUrl + '/viewCartProducts');
  }

  incrementQuantity(data: any) {
    return this.http.patch(environment.apiBaseUrl + '/increaseQuantity', data);
  }

  decrementQuantity(data: any) {
    return this.http.patch(environment.apiBaseUrl + '/decreaseQuantity', data);
  }

  removeFromCart(data: any) {
    console.log('-> removeFromCart data:', data);
    return this.http.post(environment.apiBaseUrl + '/removeFromCart', data);
  }

  updateCart() {
    this.getAllCartProducts().subscribe(
      (res: any) => {
        this.cartArr = res.data;
        console.log('-> cartArr:', this.cartArr);
        this.totalCost = 0;
        if (this.cartArr) {
          this.cartArr.forEach((product) => {
            this.totalCost += product['Product.Price'] * product.Quantity;
          });
        }
      },
      (err) => {
        console.log('-> getCart err:', err);
      }
    );
  }

  updateTotalCost() {
    this.totalCost = 0;
    console.log('-> updateTotalCost:', this.cartArr);
    this.cartArr.forEach((product) => {
      this.totalCost += product['Product.Price'] * product.Quantity;
    });
  }
}
