import { TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ThingsService } from '../things.service';
import * as ThingActions from './things.actions';
import { ThingsEffects } from './things.effects';
import * as fromThings from './things.reducer';

describe('ThingsEffects', () => {
  let actions: Observable<any>;
  let effects: ThingsEffects;
  let service: ThingsService;
  let store: Store<fromThings.ThingsState>;
  let metadata: EffectsMetadata<ThingsEffects>;

  beforeEach(() => {
    const initialState = {
      [fromThings.THINGS_FEATURE_KEY]: fromThings.initialState
    };

    TestBed.configureTestingModule({
      providers: [
        ThingsEffects,
        ThingsService,
        provideMockActions(() => actions),
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject(ThingsEffects);
    metadata = getEffectsMetadata(effects);
    service = TestBed.inject(ThingsService);
    store = TestBed.inject(Store);
  });

  // 1.
  describe('non-dispatching tap effect', () => {
    it('should not dispatch', () => {
      expect(metadata.performThingAction$).toEqual(
        expect.objectContaining({
          dispatch: false
        })
      );
    });

    it('should perform action', () => {
      // set up the initial action that triggers the effect
      const action = ThingActions.performThingAction();

      // spy on the service call
      // this makes sure we're not testing the service, just the effect
      jest.spyOn(service, 'performAction');

      // set up our action list
      actions = hot('a', { a: action });

      // check that the output of the effect is what we expect it to be
      // (by doing this we will trigger the service call)
      // Note that because we don't transform the stream in any way,
      // the output of the effect is the same as the input.
      expect(effects.performThingAction$).toBeObservable(
        cold('a', { a: action })
      );

      // check that the service was called
      expect(service.performAction).toHaveBeenCalled();
    });
  });
});
