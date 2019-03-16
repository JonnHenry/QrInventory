import { TestBed } from '@angular/core/testing';

import { InvetProdService } from './invet-prod.service';

describe('InvetProdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvetProdService = TestBed.get(InvetProdService);
    expect(service).toBeTruthy();
  });
});
