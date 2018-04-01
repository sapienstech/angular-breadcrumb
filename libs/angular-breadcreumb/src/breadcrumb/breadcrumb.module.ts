import {NgModule} from "@angular/core";
import {BreadcrumbComponent} from "./component/breadcrumb.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BreadcrumbService} from "./service/breadcrumb.service";
import {BreadcrumbPopupComponent} from "./breadcrumb-popup.component";
import {SearchBoxComponent} from "./searchbox.component";
import {RoutePlaceHolderComponent} from "./route-place-holder.component";
import {BreadcrumbRouterService} from "./breadcrumb-router.service";
import {BreadcrumbResolver} from "./resolver/breadcrumb.resolver";
import {BreadcrumbDynamicResolver} from "./resolver/breadcrumb-dynamic.resolver";
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BreadcrumbComponent, BreadcrumbPopupComponent, SearchBoxComponent, RoutePlaceHolderComponent],
  exports: [BreadcrumbComponent, RoutePlaceHolderComponent],
  providers: [BreadcrumbService, BreadcrumbRouterService, BreadcrumbResolver, BreadcrumbDynamicResolver]

})
export class BreadcrumbModule {
}
