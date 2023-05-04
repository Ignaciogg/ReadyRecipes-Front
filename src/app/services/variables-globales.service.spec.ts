import { TestBed } from '@angular/core/testing';

import { VariablesGlobalesService } from './variables-globales.service';

describe('VariablesGlobalesService', () => {
  let service: VariablesGlobalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariablesGlobalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
