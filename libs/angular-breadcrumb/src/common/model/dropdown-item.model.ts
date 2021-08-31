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
  private readonly defaultSelectedItemBackgroundColorCode = '#eee';
  isSelected:boolean;
  defaultSelectedItemStyle?:Object = {'background-color':this.defaultSelectedItemBackgroundColorCode};
}
