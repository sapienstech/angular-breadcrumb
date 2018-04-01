import {BreadcrumbService,  BREADCRUMB_DATA_KEY} from "./breadcrumb.service";
import {ActivatedRoute, PRIMARY_OUTLET} from "@angular/router";
import {BreadcrumbRoute} from "../breadcrumb.model";
describe('breadcrumbDropDown service', () => {
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
            } as  ActivatedRoute;
            breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
            currBreadcrumb = breadcrumb[0];
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
                        label: "user defined"
                };
                breadcrumb = breadcrumbService.getBreadcrumbs(activatedRoute);
                currBreadcrumb = breadcrumb[0];
            });
            it('should use the user defined data', () => {
                expect(currBreadcrumb.breadcrumb.label).toBe("user defined");
            });

        });

    });

});
