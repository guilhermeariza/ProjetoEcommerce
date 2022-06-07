import { TestBed } from '@angular/core/testing';

import { CardHomeServiceService } from './card-home-service.service';

describe('CardHomeServiceService', () => {
  let service: CardHomeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardHomeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
