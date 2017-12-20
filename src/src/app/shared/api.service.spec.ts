import { inject, TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { MenuService } from './menu.service';

describe('Api Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ApiService, MenuService] });
  });

  it('should ...', inject([ApiService, MenuService], (api) => {
    expect(api.title).toBe('Angular 2');
  }));
});
