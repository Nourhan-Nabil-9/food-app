import { TestBed } from '@angular/core/testing';

import { FavRecipeService } from './fav-recipe.service';

describe('FavRecipeService', () => {
  let service: FavRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
