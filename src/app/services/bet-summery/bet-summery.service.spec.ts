import { TestBed } from '@angular/core/testing';

import { BetSummeryService } from './bet-summery.service';

describe('BetSummeryService', () => {
  let service: BetSummeryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetSummeryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
