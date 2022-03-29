import { TestBed } from '@angular/core/testing';

import { Vigilante2Guard } from './vigilante2.guard';

describe('Vigilante2Guard', () => {
  let guard: Vigilante2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Vigilante2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
