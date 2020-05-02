import { Component } from '@angular/core';

@Component({
  selector: 'ngrx-effects-patterns-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'todos';
}
