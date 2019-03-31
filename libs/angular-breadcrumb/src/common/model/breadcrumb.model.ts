import {Observable} from "rxjs";
import {BreadcrumbDropDown} from "./dropdown.model";

export interface Breadcrumb {
    label: string|Observable<string>;
    icon?: string;
    hide?: boolean
    hideChildren?: boolean;
    dropDown?: BreadcrumbDropDown
}
