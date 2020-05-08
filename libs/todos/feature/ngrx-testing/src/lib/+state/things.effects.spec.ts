import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ThingsService } from '../things.service';
import * as ThingActions from './things.actions';
import { ThingsEffects } from './things.effects';
import * as fromThings from './things.reducer';

describe('ThingsEffects', () => {
  let actions: Observable<any>;
  let effects: ThingsEffects;
  let service: ThingsService;
  let store: MockStore<fromThings.ThingsPartialState>;
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
    store = TestBed.inject(Store) as MockStore<fromThings.ThingsPartialState>;
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

  // 2.
  describe('dispatching switchmap effect', () => {
    it('should get the items and emit when the service call is successful', () => {
      // set up the initial action that triggers the effect
      const action = ThingActions.getThings();

      // set up our dummy list of things to return
      // (we could create real things here if necessary)
      const things = [];

      // spy on the service call and return our dummy list
      // this makes sure we're not testing the service, just the effect
      jest.spyOn(service, 'getThings').mockReturnValue(of(things));

      // set up our action list
      actions = hot('a', { a: action });

      // check that the output of the effect is what we expect it to be
      expect(effects.getThings$).toBeObservable(
        cold('a', { a: ThingActions.getThingsSuccess({ things }) })
      );
    });

    it('should emit an error action when the service call is unsuccessful', () => {
      // set up the initial action that triggers the effect
      const action = ThingActions.getThings();

      const error = 'There was an error';

      // spy on the service call and return an error this time
      spyOn(service, 'getThings').and.returnValue(throwError(error));

      // set up our action list
      actions = hot('a', { a: action });

      // check that the output of the effect is what we expect it to be
      expect(effects.getThings$).toBeObservable(
        cold('a', { a: ThingActions.getThingsFailure({ error }) })
      );
    });
  });

  // 3.
  describe('multi-action dispatching effect', () => {
    it('should emit initialiseComplete & getThingsSuccess if thing is found.', () => {
      const things = [
        {
          id: '1',
          name: 'Thing 1'
        }
      ];
      jest.spyOn(service, 'getThings').mockReturnValue(of(things));

      actions = hot('a', { a: ThingActions.initialisingAction() });
      const expected = cold('(bc)', {
        b: ThingActions.getThingsSuccess({ things }),
        c: ThingActions.initialiseComplete()
      });

      expect(effects.initialiseThing$).toBeObservable(expected);
    });

    it('should just emit initialiseComplete if no things are found.', () => {
      const things = [];
      jest.spyOn(service, 'getThings').mockReturnValue(of(things));

      actions = hot('a', { a: ThingActions.initialisingAction() });
      const expected = cold('a', { a: ThingActions.initialiseComplete() });

      expect(effects.initialiseThing$).toBeObservable(expected);
    });
  });

  // 4.
  describe('store reading effect', () => {
    it('should read things from the store and do something with them', () => {
      const things = [
        {
          id: '1',
          name: 'Thing 1'
        }
      ];

      store.setState({
        [fromThings.THINGS_FEATURE_KEY]: {
          log: [],
          things
        }
      });

      jest.spyOn(service, 'persistThings').mockReturnValue(of(things));

      actions = hot('a', { a: ThingActions.thingsModified() });

      expect(effects.storeReadingEffect$).toBeObservable(
        cold('a', { a: things })
      );

      expect(service.persistThings).toHaveBeenCalledWith(things);
    });
  });

  // 5.
  describe('timed dispatch effect', () => {
    it('should dispatch after a delay (fakeAsync)', fakeAsync(() => {
      actions = of(ThingActions.startThingTimer());

      let output;
      effects.timedDispatchEffect$.subscribe(action => {
        output = action;
      });

      expect(output).toBeUndefined();

      tick(ThingsEffects.timerDuration);

      expect(output).toEqual(ThingActions.thingTimerComplete());
    }));
  });
});
