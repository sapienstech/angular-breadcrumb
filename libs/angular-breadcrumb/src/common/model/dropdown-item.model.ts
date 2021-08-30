import {Params} from "@angular/router";

export interface BreadcrumbDropDownItem {
    label: string;
    url: string;
    icon?: string;
    params?: Params;
    disabled?: boolean;
    selectedItemIndicator?:BreadcrumbDropDownSelectedItem;

}

export class BreadcrumbDropDownSelectedItem{
  isSelected:boolean;
  defaultSelectedItemStyle?:Object = {'background-color':'#eee'};
}
