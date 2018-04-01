import {Component, ViewEncapsulation} from "@angular/core";
import {Breadcrumb} from "../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb-model";

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
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
