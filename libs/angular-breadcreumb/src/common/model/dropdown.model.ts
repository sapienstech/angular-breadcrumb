import {Observable} from "rxjs/Observable";
import {BreadcrumbDropDownItem} from "../../breadcrumb/breadcrumb.model";

export interface BreadcrumbDropDown {
    popupTitle?: string;
    items?: BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
    getItems?: () => BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
}