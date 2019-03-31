import {Component, ViewEncapsulation} from "@angular/core";
import {Breadcrumb} from "../../../../libs/angular-breadcrumb/src/common/model/breadcrumb.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  themes = ["winter", "summer", "spring", "decisionTheme"];
  selectedTheme: "NO_THEME";

  homeBreadcrumb:Breadcrumb={
      label: "",
      icon: "fa fa-home"
    ,
    dropDown:{
      items:[
        {label:"Products",url:"products"},
        {label:"Users",url:"users"},
        ]
    }
  }
}
