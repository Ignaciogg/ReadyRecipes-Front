import { TestBed } from '@angular/core/testing';

import { RegistradoGuard } from './registrado.guard';

describe('RegistradoGuard', () => {
  let guard: RegistradoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistradoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
