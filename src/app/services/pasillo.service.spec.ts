import { TestBed } from '@angular/core/testing';

import { PasilloService } from './pasillo.service';

describe('PasilloService', () => {
  let service: PasilloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasilloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
