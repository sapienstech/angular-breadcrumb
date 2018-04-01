# Angular Breadcrumb
[![CircleCI](https://circleci.com/gh/sapienstech/angular-breadcrumb.svg?style=svg)](https://circleci.com/gh/sapienstech/angular-breadcrumb)

This project is a fork of the now deprecated https://www.npmjs.com/package/ng2-navigator  
It was transitioned based on https://github.com/jasonaden/angular-cli-lib-example to have proper bundling and AoT support

**breadcrumb component**
 ```
   Display's the trail of routs according to angular 2 routs.
   Let the user change the title of a breadcrumb dynamically.
   Let the user navigate back to a previous route.
   Let the user navigate forward by selecting options in a dropdown from the route.
   Enable hiding routes
 ```
Some images from the demo

# Blue theme

![image](https://cloud.githubusercontent.com/assets/5977156/24284417/339b2686-107c-11e7-85e2-cae461d83ba9.png)


# Spring Theme

![image](https://cloud.githubusercontent.com/assets/5977156/24284432/4434b304-107c-11e7-8d3c-02043e5af5db.png)

# Winter theme
![image](https://cloud.githubusercontent.com/assets/5977156/24284583/0f0f020a-107d-11e7-8dc5-5a7cf8f983d2.png)


# Dependencies
 Angular 4/5

# Install
install via npm
```
  npm install @decision/angular-breadcrumb --save
```
# Usage
Import the breadcrumb module into your module.
```
import {BreadcrumbModule} from "@decision/angular-breadcrumb";

@NgModule({
    imports: [BreadcrumbModule],
})
export class AppModule {
    ...
}
```
Place the breadcrumb selector in your component's html somewhere above your router-outlet:
```
<dcn-breadcrumb></dcn-breadcrumb>
.
.
.
<router-outlet></router-outlet>
```
in system.config.js add map
```
  map: {
    '@decision/angular-breadcrumb': 'npm:@decision/angular-breadcrumb/bundles/decision-angular-breadcrumb.umd.js'
```
in system.config.js add package
```
  packages: {
    '@decision/angular-breadcrumb': { defaultExtension: 'js' }
```

**That is it. you are ready to run your application**

but it does not look nice.
you can change the theme colors.
you can define the theme manually , but you can use a less function to help you.
in the example below you can select winter/spring or summer themes
```
@import "breadcrumb/breadcrumb-theme.less";

dcn-breadcrumb.winter {
  .breadcrumb-colors(#b176b6, yellow, blue, yellow,
    #b176b6,red,
    gray,#fff5ea,red,
    #d7d5cb,#b176b6);
}

dcn-breadcrumb.summer {
  .breadcrumb-colors(#e72154, #e0e78a, #3bc3ff, white,
    #e72154,yellow,
    blue,white,yellow,
    #899ee7,#e72154);
}

dcn-breadcrumb.spring {
  .breadcrumb-colors(#5FC073, white, #78e2eb, white,
    #5FC073,yellow,
    gray,yellow,blue,
    #040404,#5FC073);
}


```
you can change the them to "winter" class like this.
```
<dcn-breadcrumb class="winter"></dcn-breadcrumb>
```
you should use ```encapsulation: ViewEncapsulation.None```  in order to influence the style, or instead you can import the style from index.html.


# Controlling the text on a breadcrumb (static)
in our routing definitions we can add some more metadata to give the route a friendly name.

**in the example below we change path 'dashboard' into 'My Dashboard'.** 

```
const routes: Routes = [
  {
    path: 'dashboard',
    data:{breadcrumb:{label:'My Dashboard'}},
 }
```

**in the example below we hide 'dashboard' path.**


```
const routes: Routes = [
  {
    path: 'dashboard',
    data:{breadcrumb:{label:'My Dashboard',hide:true}},
 }
```

# Controlling the text on a breadcrumb (dynamic)
There are links that looks like this ```details/:id```
in these cases you want to show the details value instead of details/:id.
to do that you can listen to routing data changes, and update the label from the component code by updating the heroNameObservable.

## Using breadcrumb resolver.

  For all paths that are not leafs the user should create a resolver that updates the breadcrumb
  The route configuration should look like this:
   ```
    const routes: Routes = [
      {
        path: 'dashboard',
        resolve:{breadcrumb:MyBreadcrumbResolver}},
     }
  ```
  and the resolver implementation should look like this:
  
  ```
import {Breadcrumb} from "ng2-navigator/breadcrumb-model";  
@Injectable()
export class MyBreadcrumbResolver implements Resolve<Breadcrumb> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Breadcrumb>|Breadcrumb{
    
       // you can use here any service you need , note that you can also return Observable<Breadcrumb>|
        return {
          label:"my breadcrumb label"
          .
          .
          .
        };
    }
}
```
## Using breadcrumb in a component
 Sometimes in a leaf component there is a need to change the breadcrumb lable according to changed data.
 you can do this ny getting a reference to the breadcrumb and updating its information.
 
 * Note that in this example we use the fact that the label can be Observable, so by changing the Observable value we can change the breadcrumb value. 
```
 ngOnInit(){
      let heroNameObservable = new BehaviorSubject<string>("hero name");
     this.route.data.subscribe(routeData=>{
           routeData[BREADCRUMB_DATA_KEY].label = heroNameObservable
         });
   }
```


# The inherited resolver behavior (dynamic)
 You may note that resolvers are inherited when no component is used in the routing definition.
 look at the example below
 
 ```
    path: "users", resolve: {breadcrumb: BreadcrumbResolver}, data: {breadcrumb: {label: "Users"}},
    children: [
      {path: "", component: UsersComponent,},
      {path: "details/:id", component: UserDetailComponent}

```
  if you try to change the breadcrumb information  UserDetailComponent then you actually are changing the breadcrumb of the parent(users) too. 
  To solve this problem you can change the child definition like this
  ```
    path: "users", resolve: {breadcrumb: BreadcrumbResolver}, data: {breadcrumb: {label: "Users"}},
    children: [
      {path: "", component: UsersComponent,},
      {path: "details/:id", component: UserDetailComponent, resolve: {breadcrumb: BreadcrumbDynamicResolver}}
```

  BreadcrumbDynamicResolver will create a new empty breadcrumb definition for UserDetailComponent, so now changing breadcrumb in UserDetailComponent will change only its breadcrumb (and not its parent). 

# The inherited resolver behavior (static)
 In case you have static data on your routing definition you can use 
 ```
     {
       path: 'parent',resolve:{breadcrumb:Myresolver},
         children: [
            {path: 'child',
                    data: {breadcrumb: {label: "My breadcrumb label"}}
                    component: MyComponent, 
                    resolve: {breadcrumb: BreadcrumbResolver}}]
     }
```
  BreadcrumbResolver will create a new empty breadcrumb definition for MyComponent and copy the static data into it.
  This also fix the inherited resolver issue.  

# Setting forward routing
You can let let the router have a function that shows the forward links.
dropDown.getItems is a function that returns BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>.
 
 this way you can return forward items.
 
```
this.route.data.subscribe(data=>{
      data[BREADCRUMB_DATA_KEY].dropDown.getItems = this.buildBreadcrumbDropDownData.bind(this);
    });
    
```


# The breadcrumb model.
```

export interface Breadcrumb {
  label: string|Observable<string>;
  icon?: string;
  hide?: boolean
  dropDown?: BreadcrumbDropDown
}

export interface BreadcrumbDropDown {
  popupTitle?: string;
  items?: BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
  getItems?: () => BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
}


export interface BreadcrumbDropDownItem {
  label: string;
  url: string;
  icon?: string;
  params?: Params;
  disabled?: boolean
}

export interface BreadcrumbRoute {
  breadcrumb: Breadcrumb
  url: string;
  params: Params;
}

```
