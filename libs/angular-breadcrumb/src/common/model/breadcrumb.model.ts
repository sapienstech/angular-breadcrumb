import {Observable} from "rxjs/Observable";
import {BreadcrumbDropDown} from "./dropdown.model";

export interface Breadcrumb {
    label: string|Observable<string>;
    icon?: string;
    hide?: boolean
    dropDown?: BreadcrumbDropDown,
    drillDownChildren: boolean
}
