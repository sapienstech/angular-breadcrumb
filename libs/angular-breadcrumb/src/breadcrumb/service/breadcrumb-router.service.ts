import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
@Injectable()
export class BreadcrumbRouterService {
  constructor(public activatedRoute: ActivatedRoute) {
  }
}
