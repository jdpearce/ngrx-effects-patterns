import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
      }
    ])
  ],
  declarations: [DashboardComponent],
  entryComponents: [DashboardComponent]
})
export class TodosFeatureNgrxTestingModule {}
