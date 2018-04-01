import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Breadcrumb} from "../../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb-model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-demo',
  template: `
    <p>
      in this demo
      I have many products!
      
    </p>
    <div style="background-color: antiquewhite; color: black;">Current product is [{{currentProduct}}] </div>
    `,

})
export class DemoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  currentProduct: string;


  ngOnInit() {
    let productSubject = new BehaviorSubject<string>("i am a Product");
    this.activatedRoute.data.subscribe((data: {breadcrumb: Breadcrumb}) => {
      data.breadcrumb = {
        label: productSubject,
        icon: "fa fa-globe"
        // dropDown: {
        //   items: [
        //     {label: "product1", url: "products/product1", icon:"fa fa-trash-o"},
        //     {label: "product2", url: "products/product2", icon:"fa fa-trash-o"}
        //   ]
        // }
      };
      setTimeout(() => {
        productSubject.next("I have Changed");
        productSubject.complete();
      }, 5000);
    });
    this.activatedRoute.url.subscribe(param => {
      this.currentProduct = param[param.length - 1].path;
    });
  }

}
