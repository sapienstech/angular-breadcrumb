import {AfterViewChecked, Directive, Input, OnInit} from '@angular/core';
import {ParamMap} from "@angular/router";
import {BreadcrumbDropDownItem} from "angular-breadcrumb";

@Directive({
  selector: '[highlightCurrentOpenedItem]'
})
export class HighlightCurrentOpenedItemDirective implements OnInit , AfterViewChecked {


  @Input()
  pathParamMap:ParamMap;
  @Input()
  dropDownItem:BreadcrumbDropDownItem

  constructor() { }

  ngOnInit(): void {
    console.log('elem pas' , this.pathParamMap , this.dropDownItem);
  }

  ngAfterViewChecked(): void {
    console.log('elem pas' , this.pathParamMap , this.dropDownItem
    )
  }

}
