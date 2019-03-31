import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {BREADCRUMB_DATA_KEY} from "../service/breadcrumb.service";
import {Breadcrumb} from "../../common/model/breadcrumb.model";

@Injectable()
export class BreadcrumbResolver implements Resolve<Breadcrumb> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb>|Breadcrumb {
    return route.data[BREADCRUMB_DATA_KEY];
  }
}
