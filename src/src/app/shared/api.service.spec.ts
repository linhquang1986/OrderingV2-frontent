import { inject, TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

describe('Api Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ MenuService] });
  });

  it('should ...', inject([ MenuService], (api) => {
    expect(api.title).toBe('Angular 2');
  }));
});
