import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ParamMap} from "@angular/router";
import {BreadcrumbDropDownItem} from "../common/model/dropdown-item.model";

@Directive({
  selector: '[highlightCurrentOpenedItem]'
})
export class HighlightCurrentOpenedItemDirective implements OnInit  {

  @Input()
  pathParamMap:ParamMap;
  @Input()
  dropDownItem:BreadcrumbDropDownItem
  @Input()
  color:string = '#eee'

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    if( this.dropDownItem.breadCrumbIdentifierAndIdPair && +(this.pathParamMap.get(this.dropDownItem.breadCrumbIdentifierAndIdPair.breadcrumbIdentifier)) === this.dropDownItem.breadCrumbIdentifierAndIdPair.itemId){
      this.elementRef.nativeElement.style.backgroundColor = this.color;
    }
  }



}
