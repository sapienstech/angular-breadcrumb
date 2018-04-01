import {Component, Input} from "@angular/core";
@Component({
  selector: 'dynamic-list-item',
  template: `
    <div>Template Item
    {{item.breadcrumb.label}}
    </div>
  `
})
export class BreadcrumbTemplate{
  @Input() public item: number;
}
