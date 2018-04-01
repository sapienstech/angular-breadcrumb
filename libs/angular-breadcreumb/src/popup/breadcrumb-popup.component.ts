import {Component, Input, ElementRef, HostListener, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/mergeMap";
import {BreadcrumbDropDown, BreadcrumbDropDownItem} from "../../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb-model";
import {Router} from "@angular/router";

@Component({
  moduleId: "" + module.id,
  selector: 'dcn-breadcrumb-popup',
  styleUrls: ["../../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb.component.css"],
  template: `
<div class="popover" >
  <button *ngIf="isShowNextArrow"  #btn3 [ngClass]="{'menu-button':true, 'has-no-popup':!isShowBreadcrumbDropDown,'has-popup':isShowBreadcrumbDropDown,'is-active':showPopup}" (click)="setInitialFilter($event)">
    <i class="fa fa-angle-right menu-button-icon"></i>
  </button>
  <div *ngIf="showPopup" class="breadcrumbPopup">
  <div class="arrowUp"></div>
      <h4 *ngIf="breadcrumbDropDown.popupTitle">{{breadcrumbDropDown.popupTitle}}</h4>
      <dcn-search-box class="breadcrumb-popup-search"
                      #searchbox
                      [searchData]="search"
                      (keydown.arrowDown)="selectElementDown($event)"
                      (keydown.arrowUp)="selectElementUp($event)"
                      (keydown.enter)="navigate()"
                      [minLength]="0"
                      (results)="onFiltered($event)">
      </dcn-search-box>
      
      <div class="breadcrumb-popup-menu" #scrollMe >
          <div *ngFor="let nextLink of filteredItems; let inx=index;"  class="breadcrumb-popup-menu-item">

              <a *ngIf="nextLink.disabled"
                 (mouseenter)="selectedItemIndex=inx"
                 [ngClass]="{'breadcrumb-popup-link':true, 'is-disabled':nextLink.disabled, 'is-selected':inx==selectedItemIndex}" >
              <i class="{{nextLink.icon}} icon breadcrumb-popup-link-icon" ></i>
              <span class="breadcrumb-popup-link-text" >{{nextLink.label}}</span></a>


              <a *ngIf="!nextLink.disabled" 
                 [routerLink]="[nextLink.url, nextLink.params?nextLink.params:{}]" 
                 (mouseenter)="selectedItemIndex=inx"
                 (click)="hidePopup()"
                 [ngClass]="{'breadcrumb-popup-link':true, 'is-selected':inx==selectedItemIndex}" >
              <i class="{{nextLink.icon}} icon breadcrumb-popup-link-icon" ></i>
              <span class="breadcrumb-popup-link-text" >{{nextLink.label}}</span></a>
          </div>
      </div>
  </div>
</div>

`
})
export class BreadcrumbPopupComponent {

  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
  allItems: BreadcrumbDropDownItem[];
  filteredItems: BreadcrumbDropDownItem[];
  selectedItemIndex: number;
  private itemSelectedByKeyboard: boolean = false;

  @Input()
  isLast: boolean;

  _showPopup = false;

  get showPopup() {
    return this._showPopup;
  }

  set showPopup(isShow: boolean) {
    this._showPopup = isShow;
  }

  constructor(private elementRef: ElementRef, private router: Router) {
    this.search = this.search.bind(this);
  }

  get isShowNextArrow(): boolean {
    return this.isShowBreadcrumbDropDown || !this.isLast;
  }

  get isShowBreadcrumbDropDown(): boolean {
    return this.breadcrumbDropDown &&
      (this.breadcrumbDropDown.getItems != undefined ||
      this.breadcrumbDropDown.items instanceof Observable ||
      this.breadcrumbDropDown.items && this.breadcrumbDropDown.items.length > 0);
  }

  @HostListener('keydown.escape', ['$event'])
  onKeyEscape(event: KeyboardEvent) {
    this.hidePopup();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hidePopup();
    }
  }

  hidePopup() {
    this.showPopup = false;
  }

  search(query: string): Observable<any[]> {
    let search = query.toUpperCase();
    let result = this.allItems.filter(item => item.label.toLocaleUpperCase().indexOf(search) > -1);
    return Observable.of(result);
  }

  setInitialFilter(event: MouseEvent) {
    this.resetSelection();
    const items = this.items;
    if (items instanceof Observable) {
      let subscription = items.subscribe(vals => {
        this.allItems = vals;
        this.filteredItems = vals;
        this.showPopup = !this.showPopup;
        if (subscription) {
          subscription.unsubscribe();
        }
      })
    }
    else {
      this.allItems = items;
      this.filteredItems = items;
      this.showPopup = !this.showPopup;
    }
  }

  get items(): BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]> {
    if (this.breadcrumbDropDown.getItems) {
      return this.breadcrumbDropDown.getItems();
    }
    else {
      return this.breadcrumbDropDown.items;
    }
  }

  onFiltered(filteredBreadcrumbDropDownData: BreadcrumbDropDownItem[]) {
    if (!(filteredBreadcrumbDropDownData && filteredBreadcrumbDropDownData.find(f => f == this.selectedItem))) {
      this.resetSelection();
    }
    else if (filteredBreadcrumbDropDownData) {
      this.selectedItemIndex = filteredBreadcrumbDropDownData.findIndex(f => f == this.selectedItem);

    }
    this.filteredItems = filteredBreadcrumbDropDownData;
  }


  private resetSelection() {
    this.selectedItemIndex = -1;
  }


  selectElementDown(event: KeyboardEvent) {
    if (this.selectedItemIndex != this.filteredItems.length - 1) {
      this.selectedItemIndex++;
      this.itemSelectedByKeyboard = true;
    }
    event.preventDefault();
  }

  selectElementUp(event: KeyboardEvent) {
    if (this.selectedItemIndex != 0) {
      this.selectedItemIndex--;
      this.itemSelectedByKeyboard = true;
    }
    event.preventDefault();
  }

  navigate() {
    if (this.selectedItemIndex >= 0 && this.selectedItemIndex <= this.filteredItems.length && !this.filteredItems[this.selectedItemIndex].disabled) {
      this.router.navigateByUrl(this.filteredItems[this.selectedItemIndex].url);
    }
  }

  private  get selectedItem() {
    return this.filteredItems ? this.filteredItems[this.selectedItemIndex] : undefined;
  }

  ngAfterViewChecked() {
    if (this.itemSelectedByKeyboard) {
      this.scrollIntoView();
      this.itemSelectedByKeyboard = false;
    }
  }

  private scrollIntoView() {
    if (this.myScrollContainer && this.myScrollContainer.nativeElement) {
      let selectedElement = this.myScrollContainer.nativeElement.querySelector('.is-selected');
      if (selectedElement) {
        this.scrollInView(this.myScrollContainer.nativeElement, selectedElement);
      }
    }
  }


  private lineHeight: number;
  @ViewChild('scrollMe')
  private myScrollContainer: ElementRef;

  private scrollInView(container, item) {
    let borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
    let borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
    let paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);

    if (offset < 0) {
      container.scrollTop = scroll + offset;
    }
    else if ((offset + itemHeight) > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  }

  private getOuterHeight(el, margin?) {
    let height = el.offsetHeight;

    if (margin) {
      let style = getComputedStyle(el);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }
}
