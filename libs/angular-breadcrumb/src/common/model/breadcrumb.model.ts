import {Observable} from "rxjs";
import {BreadcrumbDropDown} from "./dropdown.model";
import {BreadcrumbRoute} from "./route.model";
import {Params} from "@angular/router";


export interface Breadcrumb {
  label: string | Observable<string>;
  icon?: string;
  hide?: boolean;
  hideChildren?: boolean;
  dropDown?: BreadcrumbDropDown;
  children?: BreadcrumbRoute[];// extra urls after current
  queryParams?: Params;
}
