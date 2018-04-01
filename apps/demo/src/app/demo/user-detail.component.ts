import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BREADCRUMB_DATA_KEY} from "../../../../../libs/angular-breadcrumb/src/breadcrumb/service/breadcrumb.service";

@Component({
  selector: 'aaa',
  template: `
    <h1>
      I am a User
    </h1>
  `,

})
export class UserDetailComponent {

  breadcrumbLabel = new BehaviorSubject<string>("");

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.activatedRoute.data.subscribe(data => {
      data[BREADCRUMB_DATA_KEY].label = this.breadcrumbLabel;
    });

    this.activatedRoute.params.subscribe(params => {
      //simulate long running service
      setTimeout(()=>{
        let param = +params['id'];
        switch (param) {
          case 1:
            this.breadcrumbLabel.next("First User");
            break;
          case 2:
            this.breadcrumbLabel.next("Second User");
            break;
        }
      },200);
    });
  }
}

