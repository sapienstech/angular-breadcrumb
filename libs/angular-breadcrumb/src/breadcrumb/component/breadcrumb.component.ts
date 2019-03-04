
import {filter} from 'rxjs/operators';
import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BreadcrumbService} from "../service/breadcrumb.service";
import {Observable} from "rxjs";
import {BreadcrumbRoute} from "../../common/model/route.model";
import {Breadcrumb} from "../../common/model/breadcrumb.model";

@Component({
  selector: "dcn-breadcrumb",
  styleUrls: ["breadcrumb.component.less"],
  template: `
 
<div *ngIf="!hideBreadcrumb" class="breadcrumb">

  <ng-container *ngFor="let route of breadcrumbRoutes; let inx = index; let isLast=last" >
    <div *ngIf="!route.breadcrumb.hide" class="breadcrumb-holder">
      <a [routerLink]="[route.url]" class="breadcrumb-link">
        <i *ngIf="route.breadcrumb.icon && inx==0" class="{{route.breadcrumb.icon}} home-icon"></i>
        <i *ngIf="route.breadcrumb.icon && inx!=0" class="{{route.breadcrumb.icon}} icon link-icon" ></i>
        <span *ngIf="!isString(route.breadcrumb.label)">{{route.breadcrumb.label |async}}</span>
        <span *ngIf="isString(route.breadcrumb.label)">{{route.breadcrumb.label}}</span>
      </a>
      <dcn-breadcrumb-popup [isLast]="isLast" [breadcrumbDropDown]="route.breadcrumb.dropDown"></dcn-breadcrumb-popup>
    </div>
  </ng-container>
</div>

`
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbRoutes: BreadcrumbRoute[];
  homeBreadcrumbRoute: BreadcrumbRoute;

  @Input()
  hideWhenNothingToShow = false;

  @Input()
  set homeBreadcrumb(breadcrumb: Breadcrumb) {
    if (breadcrumb) {
      this.homeBreadcrumbRoute.breadcrumb = breadcrumb;
    }
  }

  isString(val: string|Observable<string>) {
    return typeof val === "string";
  }

  get hideBreadcrumb(){
    return this.hideWhenNothingToShow && !this.hasRoutes;
  }

  get hasRoutes(): boolean {
    return this.calculateHasRoutes();
  }

  constructor(private breadcrumbService: BreadcrumbService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.breadcrumbRoutes = [];
    this.homeBreadcrumbRoute = {
      breadcrumb: {
        label: "",
        icon: "fa fa-home home-icon"
      },
      url: "",
      params: undefined
    };
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.breadcrumbRoutes = [];
      this.breadcrumbRoutes.push(this.homeBreadcrumbRoute);
      this.breadcrumbRoutes.push(...this.breadcrumbService.getBreadcrumbs(this.activatedRoute.root)
        .filter(breadcrumb => !breadcrumb.breadcrumb.hide));
    });
  }

  private calculateHasRoutes(){
    return this.breadcrumbRoutes && this.breadcrumbRoutes.length > 0 && this.breadcrumbRoutes.find(route => !route.breadcrumb.hide) !== undefined
  }
}
