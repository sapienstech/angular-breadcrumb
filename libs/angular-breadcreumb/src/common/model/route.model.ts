import {Params} from "@angular/router";

export interface BreadcrumbRoute {
    breadcrumb: Breadcrumb
    url: string;
    params: Params;
}