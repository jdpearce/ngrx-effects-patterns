import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ThingsEffects } from './+state/things.effects';
import * as fromThings from './+state/things.reducer';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThingsService } from './things.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
      }
    ]),
    StoreModule.forFeature(fromThings.THINGS_FEATURE_KEY, fromThings.reducer),
    EffectsModule.forFeature([ThingsEffects])
  ],
  declarations: [DashboardComponent],
  entryComponents: [DashboardComponent],
  providers: [ThingsService]
})
export class TodosFeatureNgrxTestingModule {}
