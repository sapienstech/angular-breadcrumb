import {Params} from "@angular/router";

export interface BreadcrumbDropDownItem {
    label: string;
    url: string;
    icon?: string;
    params?: Params;
    disabled?: boolean
}