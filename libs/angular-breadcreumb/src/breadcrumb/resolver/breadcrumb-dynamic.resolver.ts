import {Injectable} from "@angular/core";
import {Breadcrumb} from "../../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb-model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
@Injectable()
export class BreadcrumbDynamicResolver implements Resolve<Breadcrumb> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb> | Promise<Breadcrumb> | Breadcrumb {
    return {label: ""};
  }

}
