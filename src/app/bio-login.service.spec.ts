import { TestBed } from '@angular/core/testing';

import { BioLoginService } from './bio-login.service';

describe('BioLoginService', () => {
  let service: BioLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
