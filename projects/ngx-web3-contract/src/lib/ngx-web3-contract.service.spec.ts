import { TestBed } from '@angular/core/testing';

import { NgxWeb3ContractService } from './ngx-web3-contract.service';

describe('NgxWeb3ContractService', () => {
  let service: NgxWeb3ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxWeb3ContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
