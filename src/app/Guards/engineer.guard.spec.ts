import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { engineerGuard } from './engineer.guard';

describe('engineerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => engineerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
