import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../_services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  environment = environment;
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    console.log('-> cartArr:', this.cartService.cartArr);
  }

  incrementQuantity(productId: number) {
    const data = { ProductId: productId };
    this.cartService.incrementQuantity(data).subscribe(
      (res) => {
        console.log(res);
        for (let i = 0; i < this.cartService.cartArr.length; i++) {
          if (this.cartService.cartArr[i]['Product.ProductId'] === productId) {
            this.cartService.cartArr[i].Quantity++;
            this.cartService.updateTotalCost();
            break;
          }
        }
      },
      (err) => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }

  decrementQuantity(productId: number) {
    const data = { ProductId: productId };
    this.cartService.decrementQuantity(data).subscribe(
      (res) => {
        console.log(res);
        for (let i = 0; i < this.cartService.cartArr.length; i++) {
          if (this.cartService.cartArr[i]['Product.ProductId'] === productId) {
            this.cartService.cartArr[i].Quantity--;
            if (this.cartService.cartArr[i].Quantity <= 0) {
              this.cartService.cartArr.splice(i, 1);
            }
            this.cartService.updateTotalCost();
            break;
          }
        }
      },
      (err) => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }

  deleteCartProduct(productId: number) {
    const data = { ProductId: productId };
    this.cartService.removeFromCart(data).subscribe(
      (res) => {
        console.log('deleteFromCart res:', res);
        for (let i = 0; i < this.cartService.cartArr.length; i++) {
          if (this.cartService.cartArr[i]['Product.ProductId'] === productId) {
            this.cartService.cartArr.splice(i, 1);
            this.cartService.updateTotalCost();
            break;
          }
        }
      },
      (err) => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }
}
