import {Params} from "@angular/router";
import {Breadcrumb} from "./breadcrumb.model";

export interface BreadcrumbRoute {
    breadcrumb: Breadcrumb
    url: string;
    params: Params;
}
