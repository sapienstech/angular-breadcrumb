import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Breadcrumb} from "../../common/model/breadcrumb.model";

@Injectable()
export class BreadcrumbDynamicResolver implements Resolve<Breadcrumb> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb> | Promise<Breadcrumb> | Breadcrumb {
    return {label: ""};
  }

}
