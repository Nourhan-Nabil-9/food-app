import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userPorterGuard } from './user-porter.guard';

describe('userPorterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userPorterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
