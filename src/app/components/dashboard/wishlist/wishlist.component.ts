import { Component, OnInit } from '@angular/core';

import {
  WishListProductsService,
  ProductService,
  CartService,
} from '../../../_services';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  environment = environment;
  constructor(
    public wishlistService: WishListProductsService,
    public productService: ProductService,
    public cartService: CartService
  ) {
    console.log('-> wishlist:', wishlistService.wishlistArr);
  }

  ngOnInit(): void {}

  deleteFromWishlist(productId: number) {
    const data = { ProductId: productId };
    this.wishlistService.removeFromWishList(data).subscribe(
      (res) => {
        console.log('-> deleteFromWishList res:', res);
        for (let i = 0; i < this.wishlistService.wishlistArr.length; i++) {
          if (
            this.wishlistService.wishlistArr[i]['Product.ProductId'] ===
            productId
          ) {
            this.wishlistService.wishlistArr.splice(i, 1);
            break;
          }
        }
      },
      (err) => {
        console.log('-> deleteFromWishlist err:', err);
        alert(err.error.message);
      }
    );
  }

  addToCart(productId: number) {
    const data = { ProductId: productId, Quantity: 1 };
    this.productService.addToCart(data).subscribe(
      (res) => {
        console.log('-> addToCart res:', res);
        this.cartService.updateCart();
        alert('Added to cart');
      },
      (err) => {
        console.log('-> addToCart err:', err);
        alert(err.error.message);
      }
    );
  }
}
