import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, PRIMARY_OUTLET} from "@angular/router";
import {BreadcrumbRoute} from "../../common/model/route.model";
import {Breadcrumb} from "../../common/model/breadcrumb.model";
import {Subject} from "rxjs/index";

export const BREADCRUMB_DATA_KEY = "breadcrumb";


@Injectable()
export class BreadcrumbService {
  private refreshed = new Subject();

  get refreshed$() {
    return this.refreshed.asObservable();
  }

  constructor() {

  }

  refresh() {
    this.refreshed.next();
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
    let breadCrumbData: Breadcrumb = child && child.snapshot.data && child.snapshot.data[BREADCRUMB_DATA_KEY];

    if (breadCrumbData && breadCrumbData.hideChildren) {
      return;
    }

    if (!child || (child.routeConfig.path.length === 0 && !this.hasChildren(child))) {
      return;
    }

    //verify the custom property "breadcrumbDropDown" is specified on the route
    if (!breadCrumbData) {
      child.snapshot.data[BREADCRUMB_DATA_KEY] = this.buildPlainBreadcrumbData(child);
    }

    //get the route's URL segment
    const routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

    //append route URL to URL
    url += `/${routeURL}`;

    //add breadcrumbDropDown
    const breadcrumb: BreadcrumbRoute = {
      breadcrumb: child.snapshot.data[BREADCRUMB_DATA_KEY],
      params: child.snapshot.queryParams,
      url: url
    };
    breadcrumbs.push(breadcrumb);
    this.addBreadcrumbExtensions(breadcrumb, breadcrumbs);
    return this.getBreadcrumbsRecursive(child, url, breadcrumbs);


  }

  private addBreadcrumbExtensions(breadcrumb: BreadcrumbRoute, breadcrumbs: BreadcrumbRoute[]) {
    if (breadcrumb.breadcrumb.children) {
      breadcrumbs.push(...breadcrumb.breadcrumb.children);
    }
  }

  private hasChildren(child: ActivatedRoute | undefined) {
    return child.children && child.children.length > 0;
  }

  private buildPlainBreadcrumbData(child: ActivatedRoute): Breadcrumb {
    return {
      label: child.routeConfig.path,
      icon: "icon-explanation_mark",
    };
  }

}
