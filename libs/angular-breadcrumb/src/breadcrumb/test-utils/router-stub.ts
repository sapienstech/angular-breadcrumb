/* tslint:disable:directive-selector component-selector no-input-rename use-host-property-decorator */

// export for convenience.
import {Component, Directive, Injectable, Input} from '@angular/core';
import {NavigationExtras} from '@angular/router';
// Only implements params and part of snapshot.params
//region activated-route-stub
import {BehaviorSubject} from 'rxjs';

export {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

//region router-link
@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  @Input()
  queryParams;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
// #endregion

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent {
}

@Injectable()
export class RouterStub {
  private subject = new BehaviorSubject(this.testEvents);
  events = this.subject.asObservable();

  // Test events
  private _events: Event;

  get testEvents(): Event {
    return this._events;
  }

  set testEvents(event: Event) {
    this._events = event;
    this.subject.next(event);
  }

  navigate(commands: any[], extras?: NavigationExtras) {
  }

}


@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};
  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return {params: this.testParams};
  }
}
//endregion activated-route-stub
