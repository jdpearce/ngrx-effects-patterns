import { async, TestBed } from '@angular/core/testing';
import { TodosFeatureNgrxTestingModule } from './todos-feature-ngrx-testing.module';

describe('TodosFeatureNgrxTestingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TodosFeatureNgrxTestingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TodosFeatureNgrxTestingModule).toBeDefined();
  });
});
