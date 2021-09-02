import {Observable} from "rxjs";
import {BreadcrumbDropDownItem} from "./dropdown-item.model";

export interface BreadcrumbDropDown {
    popupTitle?: string;
    items?: BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
    getItems?: () => BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
}
