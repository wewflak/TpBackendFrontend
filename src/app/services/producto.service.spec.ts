import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';

describe('ProductoServiceService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
