import {Observable} from "rxjs";
import {BreadcrumbDropDown} from "./dropdown.model";
import {BreadcrumbDropDownItem} from "./dropdown-item.model";
import {BreadcrumbRoute} from "./route.model";


export interface Breadcrumb {
  label: string | Observable<string>;
  icon?: string;
  hide?: boolean
  hideChildren?: boolean;
  dropDown?: BreadcrumbDropDown;
  children?: BreadcrumbRoute[];// extra urls after current
}
