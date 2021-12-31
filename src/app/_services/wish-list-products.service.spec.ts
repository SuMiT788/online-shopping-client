import { TestBed } from '@angular/core/testing';

import { WishListProductsService } from './wish-list-products.service';

describe('WishListProductsService', () => {
  let service: WishListProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishListProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
