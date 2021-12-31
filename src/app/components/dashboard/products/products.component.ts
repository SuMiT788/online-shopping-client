import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { CartService, ProductService } from '../../../_services';
import { WishListProductsService } from '../../../_services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  quantity: any = {};
  environment = environment;
  constructor(
    public productService: ProductService,
    public wishlistService: WishListProductsService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {}

  onAddToWishList(productId: number) {
    this.productService.selectedProduct.ProductId = productId;
    this.productService.addToWishList().subscribe(
      (res: any) => {
        console.log('-> addToWishList res:', res);
        this.wishlistService.updateWishList();
        if (res.message === 'Success!') alert('Product is added to wish list.');
        else alert('Product already added to wish list.');
      },
      (err) => {
        console.log('-> addToWishList err:', err);
      }
    );
  }

  assignQuantity(productId: number, event: any) {
    this.productService.quantityArr[productId] = parseInt(event.target.value);
  }

  addToCart(productId: number) {
    console.log('-> Quantity:', this.productService.quantityArr[productId]);
    this.productService
      .addToCart({
        ProductId: productId,
        Quantity: this.productService.quantityArr[productId],
      })
      .subscribe(
        (res: any) => {
          console.log('addToCart res:', res);
          if (res.message === 'Success!') {
            alert('Item added to cart');
            this.cartService.updateCart();
            this.cartService.updateTotalCost();
          }
        },
        (err) => {
          console.log('addToCart err:', err);
        }
      );
  }

  changePage(pageNo: number) {
    const data = {
      Keyword: this.productService.Keyword,
      Category: this.productService.Category,
      PageNo: pageNo,
    };
    this.productService.getAllProducts(data).subscribe(
      (res: any) => {
        this.productService.productsArr = res.data.rows;
        this.productService.currentPage = pageNo;
        this.productService.updateQuantityArr();
      },
      (err) => {
        console.log('-> changePage err:', err);
        alert(err.error.message);
      }
    );
  }

  previousPage() {
    if (this.productService.currentPage === 1) {
    } else {
      const data = {
        Keyword: this.productService.Keyword,
        Category: this.productService.Category,
        PageNo: this.productService.currentPage - 1,
      };
      this.productService.getAllProducts(data).subscribe(
        (res: any) => {
          this.productService.productsArr = res.data.rows;
          this.productService.currentPage = data.PageNo;
          this.productService.updateQuantityArr();
        },
        (err) => {
          console.log('-> changePage err:', err);
          alert(err.error.message);
        }
      );
    }
  }

  nextPage() {
    if (
      this.productService.currentPage * 12 >
      this.productService.productsCount
    ) {
    } else {
      const data = {
        Keyword: this.productService.Keyword,
        Category: this.productService.Category,
        PageNo: this.productService.currentPage + 1,
      };
      this.productService.getAllProducts(data).subscribe(
        (res: any) => {
          this.productService.productsArr = res.data.rows;
          this.productService.currentPage = data.PageNo;
          this.productService.updateQuantityArr();
        },
        (err) => {
          console.log('-> changePage err:', err);
          alert(err.error.message);
        }
      );
    }
  }
}
