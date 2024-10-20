import { TestBed } from '@angular/core/testing';

import { ColorsDateService } from './colors-date.service';

describe('ColorsDateService', () => {
  let service: ColorsDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
