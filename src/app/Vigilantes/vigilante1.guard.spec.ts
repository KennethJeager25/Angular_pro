import { TestBed } from '@angular/core/testing';

import { Vigilante1Guard } from './vigilante1.guard';

describe('Vigilante1Guard', () => {
  let guard: Vigilante1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Vigilante1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
