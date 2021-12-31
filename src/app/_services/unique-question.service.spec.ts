import { TestBed } from '@angular/core/testing';

import { UniqueQuestionService } from './unique-question.service';

describe('UniqueQuestionService', () => {
  let service: UniqueQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
