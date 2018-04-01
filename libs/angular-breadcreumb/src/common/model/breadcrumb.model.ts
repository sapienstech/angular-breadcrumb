import {BreadcrumbDropDown} from "../../breadcrumb/breadcrumb.model";
import {Observable} from "rxjs/Observable";

export interface Breadcrumb {
    label: string|Observable<string>;
    icon?: string;
    hide?: boolean
    dropDown?: BreadcrumbDropDown
}