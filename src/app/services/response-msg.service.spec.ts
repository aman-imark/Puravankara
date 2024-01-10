import { TestBed } from '@angular/core/testing';

import { ResponseMsgService } from './response-msg.service';

describe('ResponseMsgService', () => {
  let service: ResponseMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
