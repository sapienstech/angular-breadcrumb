import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Breadcrumb} from "../breadcrumb.model";
import {BREADCRUMB_DATA_KEY} from "../service/breadcrumb.service";

@Injectable()
export class BreadcrumbResolver implements Resolve<Breadcrumb> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb>|Breadcrumb {
    return route.data[BREADCRUMB_DATA_KEY];
  }
}
