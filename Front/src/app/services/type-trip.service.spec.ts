import { TestBed } from '@angular/core/testing';

import { TypeTripService } from './type-trip.service';

describe('TypeTripService', () => {
  let service: TypeTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
