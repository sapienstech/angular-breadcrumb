

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbRouterService} from "./service/breadcrumb-router.service";
import {BREADCRUMB_DATA_KEY} from "./service/breadcrumb.service";
import {Breadcrumb} from "../common/model/breadcrumb.model";

@Component({
  selector: 'selector',
  providers: [BreadcrumbRouterService],
  template: `
<router-outlet></router-outlet>
`
})
export class RoutePlaceHolderComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {breadcrumb: Breadcrumb}) => {
      data[BREADCRUMB_DATA_KEY] = data.breadcrumb;
    });
  }

}
