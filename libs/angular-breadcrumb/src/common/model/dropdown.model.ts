import {Observable} from "rxjs";
import {BreadcrumbDropDownItem} from "./dropdown-item.model";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

export interface BreadcrumbDropDown {
    popupTitle?: string;
    items?: BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
    getItems?: () => BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
    activatedRoute?:ActivatedRouteSnapshot;
}
