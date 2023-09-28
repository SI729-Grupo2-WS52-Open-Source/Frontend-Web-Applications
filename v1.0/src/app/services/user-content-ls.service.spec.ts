import { TestBed } from '@angular/core/testing';

import { UserContentLSService } from './user-content-ls.service';

describe('UserContentLSService', () => {
  let service: UserContentLSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContentLSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
