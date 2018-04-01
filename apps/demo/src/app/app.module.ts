import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {DemoComponent} from "./demo/demo.component";
import {BreadcrumbModule} from "../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb.module";
import {UsersComponent} from "./demo/users.component";
import {BreadcrumbResolver} from "../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb.resolver";
import {UserDetailComponent} from "./demo/user-detail.component";
import {BreadcrumbDynamicResolver} from "../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/BreadcrumbDynamicResolver";


const community_routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {
    path: 'products',
    data: {
      breadcrumb: {
        label: "Products",
        icon:"fa fa-list link-icon",
        dropDown: {
          items: [
            {label: "product1", url: "products/product1", icon:"fa fa-globe"},
            {label: "product2", url: "products/product2", icon:"fa fa-globe"},
            {label: "product3", url: "products/product3", icon:"fa fa-globe"},
            {label: "this is product4", url: "products/product4", icon:"fa fa-globe"},
            {label: "product5", url: "products/product5", icon:"fa fa-globe"},
            {label: "product6", url: "products/product6", icon:"fa fa-globe", disabled:true},
            {label: "productA", url: "products/product6", icon:"fa fa-globe", disabled:true},
            {label: "productB", url: "products/product6", icon:"fa fa-globe", disabled:true},
            {label: "productC", url: "products/product6", icon:"fa fa-globe"},
            {label: "productD", url: "products/product6", icon:"fa fa-globe"},
            {label: "productE", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productFXx", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productF", url: "products/product6", icon:"fa fa-globe"},
            {label: "productG", url: "products/product6", icon:"fa fa-globe"}
          ]
        }
      }
    },
    children: [
      {path: '', redirectTo: "product1", pathMatch: "full", data: {breadcrumb: {}}},
      {path: "product1", component: DemoComponent, data: {breadcrumb: {label: "product1", icon:"fa fa-globe" }}},
      {path: "product2", component: DemoComponent, data: {breadcrumb: {label: "product2", icon:"fa fa-globe"}}},
      {path: "product3", component: DemoComponent, data: {breadcrumb: {label: "product3", icon:"fa fa-globe"}}},
      {path: "product4", component: DemoComponent, data: {breadcrumb: {label: "product4", icon:"fa fa-globe"}}}
    ],
  },
  {
    path: "users", resolve: {breadcrumb: BreadcrumbResolver}, data: {breadcrumb: {label: "Users"}},
    children: [
      {path: "", component: UsersComponent,},
      {path: "details/:id", component: UserDetailComponent, resolve: {breadcrumb: BreadcrumbDynamicResolver}}

    ]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent, UsersComponent, UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(community_routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
