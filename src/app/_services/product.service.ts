import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Product } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public selectedProduct: Product = {
    ProductId: NaN,
    Name: '',
    Description: '',
    Price: NaN,
    Category: '',
    Subcategory: '',
    ImagePath: '',
  };

  public productsArr: Product[];
  public productsCount: number;
  public currentPage: number = 1;
  public pages: number[] = [];
  public categoriesArr: string[] = [];
  public quantityArr: any = {};
  public Keyword: string = '';
  public Category: string = '';

  constructor(private http: HttpClient) {
    const data = {
      Keyword: this.Keyword,
      Category: this.Category,
      PageNo: this.currentPage,
    };
    this.getAllProducts(data).subscribe(
      (res: any) => {
        this.productsArr = res.data.rows;
        this.productsCount = res.data.count;
        console.log('-> allProducts:', this.productsArr);
        this.productsArr.forEach((product) => {
          this.quantityArr[product.ProductId] = 1;
        });
        let count = 1;
        for (let i = 0; i < this.productsCount; i += 12) {
          this.pages.push(count);
          count++;
        }
      },
      (err) => {
        console.log('-> error:', err);
      }
    );
    this.getAllCategories().subscribe(
      (res: any) => {
        res.data.forEach((category: any) => {
          this.categoriesArr.push(category.Category);
        });
        console.log('-> categories:', this.categoriesArr);
      },
      (err) => {
        console.log('-> error:', err);
      }
    );
  }

  getAllProducts(data: any) {
    return this.http.post(environment.apiBaseUrl + '/searchProducts', data);
  }

  getAllCategories() {
    return this.http.get(environment.apiBaseUrl + '/viewAllCategories');
  }

  searchProducts(data: any) {
    return this.http.post(environment.apiBaseUrl + '/searchProducts', data);
  }

  onSearch(data: any) {
    this.Keyword = data.Keyword;
    this.Category = data.Category;
    this.searchProducts(data).subscribe(
      (res: any) => {
        console.log('-> search res:', res);
        this.productsArr = res.data.rows;
        this.productsCount = res.data.count;
        console.log('-> allProducts:', this.productsArr);
        this.productsArr.forEach((product) => {
          this.quantityArr[product.ProductId] = 1;
        });
        let count = 1;
        this.pages = [];
        for (let i = 0; i < this.productsCount; i += 12) {
          this.pages.push(count);
          count++;
        }
      },
      (err) => {
        console.log('-> error:', err);
      }
    );
  }

  getProductByCategory() {}

  // wishList
  addToWishList() {
    console.log('-> selectedProduct:', this.selectedProduct);
    return this.http.post(
      environment.apiBaseUrl + '/addToWishList',
      this.selectedProduct
    );
  }

  addToCart(data: any) {
    console.log('-> addToCart data:', data);
    return this.http.post(environment.apiBaseUrl + '/addToCart', data);
  }

  updateQuantityArr() {
    this.quantityArr = {};
    this.productsArr.forEach((product) => {
      this.quantityArr[product.ProductId] = 1;
    });
  }
}
