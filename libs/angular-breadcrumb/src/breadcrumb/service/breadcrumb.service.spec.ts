import {BREADCRUMB_DATA_KEY, BreadcrumbService} from "./breadcrumb.service";
import {ActivatedRoute, PRIMARY_OUTLET} from "@angular/router";
import {BreadcrumbRoute} from "../../common/model/route.model";

describe('breadcrumb service', () => {
    let breadcrumbService: BreadcrumbService;
    let breadcrumb: BreadcrumbRoute[];
    let activatedRoute;
    beforeEach(() => {
        breadcrumbService = new BreadcrumbService();
    });
    it('should have NO  breadcrumbDropDown calling with minimal data', () => {
        activatedRoute = {} as  ActivatedRoute;
        const currentUrl = "currentUrl";
        breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
        expect(breadcrumb.length).toBe(0);
    });

    it(`should not have breadcrumb when hideChildren:true`,()=>{
    activatedRoute = {
      children: [
        {outlet: "NO_PRIMARY"},
        {
          outlet: PRIMARY_OUTLET,
          routeConfig: {path: ""},
          snapshot: {
            data: {breadcrumb: {hideChildren: true}},
            url: []
          },
          children: [
            {
              outlet: PRIMARY_OUTLET,
              routeConfig: {path: "myUrlConfig2"},
              snapshot: {
                data: [],
                url: [{
                  path: "myUrl2"
                }]
              }
            }
          ]
        }
      ]
    } as  any;
    breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
    expect(breadcrumb.length).toBe(0);
  });

    it(`should have breadcrumb when there is empty path with children`,()=>{
      activatedRoute = {
        children: [
          {outlet: "NO_PRIMARY"},
          {
            outlet: PRIMARY_OUTLET,
            routeConfig: {path: ""},
            snapshot: {
              data: {breadcrumb: {hide: true}},
              url: []
            },
              children: [
                {
                  outlet: PRIMARY_OUTLET,
                  routeConfig: {path: "myUrlConfig2"},
                  snapshot: {
                    data: [],
                    url: [{
                      path: "myUrl2"
                    }]
                  }
                }
              ]
          }
        ]
      } as  any;
      breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
      expect(breadcrumb.length).toBe(2);
      expect(breadcrumb[1].breadcrumb.label).toBe('myUrlConfig2');
    });
    it('should have NO  breadcrumbDropDown when there is an empty children array', () => {
        activatedRoute = {
            children: []
        } as  ActivatedRoute;
        breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
        expect(breadcrumb.length).toBe(0);
    });
    it('should have NO  breadcrumbDropDown when it has one child with no primary outlet', () => {
        activatedRoute = {
            children: [{outlet: "NO_PRIMARY"}]
        } as  ActivatedRoute;
        breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
    });

    describe('when not data is available', () => {
        let currBreadcrumb: BreadcrumbRoute;
      let breadcrumbCount: number;
        beforeEach(() => {
            activatedRoute = {
                children: [
                    {outlet: "NO_PRIMARY"},
                    {
                        outlet: PRIMARY_OUTLET,
                        routeConfig: {path: "myUrlConfig"},
                        snapshot: {
                            data: [],
                            url: [{
                                path: "myUrl"
                            }]
                        }
                    }
                ]
            } as  any;
            breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
            currBreadcrumb = breadcrumb[0];
          breadcrumbCount = breadcrumb.length;
        });
        it('should have only one breadcrumbDropDown', () => {
            expect(breadcrumb.length).toBe(1);
        });
        it('should have a url according to the snapshot path', () => {
            expect(currBreadcrumb.url).toBe("/" + activatedRoute.children[1].snapshot.url[0].path);
        });
        it('should have its label from the configuration', () => {
            expect(currBreadcrumb.breadcrumb.label).toBe(activatedRoute.children[1].routeConfig.path);
        });
        it('should have its icon hard coded', () => {
            expect(currBreadcrumb.breadcrumb.icon).toBe("icon-explanation_mark");
        });
        describe('when data is supplied from the user', () => {
          beforeEach(() => {
            activatedRoute.children[1].snapshot.data[BREADCRUMB_DATA_KEY] = {
              label: "user defined",
              children: [
                {breadcrumb: {label: "extra"}},
                {breadcrumb: {label: "addition"}}
              ]
            };
            activatedRoute.children[1].children = [{
              uriel: "a child",
              outlet: PRIMARY_OUTLET,
              routeConfig: {path: "aa"},
              snapshot: {
                data: {[BREADCRUMB_DATA_KEY]: {label: "the end"}},
                url: [{path: "myUrl3"}]
              },

            }
            ];
            breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
            currBreadcrumb = breadcrumb[0];
          });
          it('should use the user defined data', () => {
            expect(currBreadcrumb.breadcrumb.label).toBe("user defined");
          });
          it('should add extra breadcrumbs', () => {
            expect(breadcrumb.length).toBe(4);
          });
          it('should have the breadcrumb in this order', () => {
            expect(breadcrumb[0].breadcrumb.label).toBe("user defined");
            expect(breadcrumb[1].breadcrumb.label).toBe("extra");
            expect(breadcrumb[2].breadcrumb.label).toBe("addition");
            expect(breadcrumb[3].breadcrumb.label).toBe("the end");
          })

        });

    });

  it('should notify when request for refresh', () => {
    let wasRefreshRequest = false;
    breadcrumbService.refreshed$.subscribe(() => wasRefreshRequest = true);
    breadcrumbService.refresh();
    expect(wasRefreshRequest).toBe(true);
  })

});
