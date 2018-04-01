import {Injectable} from "@angular/core";
import {ActivatedRoute, PRIMARY_OUTLET, ActivatedRouteSnapshot} from "@angular/router";
import {BreadcrumbRoute} from "../../common/model/route.model";
import {Breadcrumb} from "../../common/model/breadcrumb.model";

export const BREADCRUMB_DATA_KEY = "breadcrumb";


@Injectable()
export class BreadcrumbService {
  private breadcrumbs: BreadcrumbRoute[];

  constructor() {

  }

  /**
   *
   * returns the urls up to current snapshot
   */
  public getBaseUrl(snapshot: ActivatedRouteSnapshot): string {
    return snapshot.pathFromRoot.reduce((acc, val) => {
      return acc + val.url.map(segment => segment.path).join("/") + "/";
    }, "");
  }

  /**
   * Returns array of BreadcrumbRoute objects that represent the breadcrumbDropDown
   */
  public getBreadcrumbs(route: ActivatedRoute): BreadcrumbRoute[] {
    const breadcrumbs: BreadcrumbRoute[] = [];
    this.getBreadcrumbsRecursive(route, "", breadcrumbs);
    return breadcrumbs;
  }

  private getBreadcrumbsRecursive(route: ActivatedRoute, url: string, breadcrumbs: BreadcrumbRoute[]): void {

    //get the child routes
    const children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (!children || children.length === 0) {
      return;
    }

    //iterate over each children
    const child = children.find(c => c.outlet === PRIMARY_OUTLET);
    if (!child || child.routeConfig.path.length === 0) {
      return;
    }

    //verify the custom property "breadcrumbDropDown" is specified on the route
    if (!child.snapshot.data.hasOwnProperty(BREADCRUMB_DATA_KEY)) {
      child.snapshot.data[BREADCRUMB_DATA_KEY] = this.buildPlainBreadcrumbData(child);
    }

    //get the route's URL segment
    const routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

    //append route URL to URL
    url += `/${routeURL}`;

    //add breadcrumbDropDown
    const breadcrumb: BreadcrumbRoute = {
      breadcrumb: child.snapshot.data[BREADCRUMB_DATA_KEY],
      params: child.snapshot.params,
      url: url
    };
    breadcrumbs.push(breadcrumb);

    return this.getBreadcrumbsRecursive(child, url, breadcrumbs);


  }

  private buildPlainBreadcrumbData(child: ActivatedRoute): Breadcrumb {
    return {
      label: child.routeConfig.path,
      icon: "icon-explanation_mark",
    };
  }

}
