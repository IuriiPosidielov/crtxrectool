import { TestBed, inject } from '@angular/core/testing';

import { TagsItemsService } from './tags-items.service';

describe('TagsItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagsItemsService]
    });
  });

  it('should be created', inject([TagsItemsService], (service: TagsItemsService) => {
    expect(service).toBeTruthy();
  }));
});
