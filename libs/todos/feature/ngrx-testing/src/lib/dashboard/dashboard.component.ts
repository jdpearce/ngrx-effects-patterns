import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ThingActions from '../+state/things.actions';
import { ThingsPartialState } from '../+state/things.reducer';
import { getLog } from '../+state/things.selectors';

@Component({
  selector: 'ngrx-effects-patterns-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  $log: Observable<string[]> = this.store.pipe(
    select(getLog),
    map(log =>
      log.map(
        entry => `${new Date(entry.time).toTimeString()} : ${entry.message}`
      )
    )
  );

  constructor(private readonly store: Store<ThingsPartialState>) {}

  ngOnInit(): void {}

  nonDispatchingTapEffect() {
    this.store.dispatch(ThingActions.performThingAction());
  }

  dispatchingSwitchMapEffect() {
    this.store.dispatch(ThingActions.getThings());
  }

  multiActionDispatchEffect() {
    this.store.dispatch(ThingActions.initialisingAction());
  }

  storeReadingEffect() {
    this.store.dispatch(ThingActions.thingsModified());
  }
}
