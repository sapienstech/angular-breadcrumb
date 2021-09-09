import {Component, Input} from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {
  ActivatedRouteStub,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  RouterStub
} from "../test-utils/router-stub";
import {By} from "@angular/platform-browser";
import {BreadcrumbService} from "../service/breadcrumb.service";
import {BreadcrumbRoute} from "../../common/model/route.model";
import {BreadcrumbDropDown} from "../../common/model/dropdown.model";
import Spy = jasmine.Spy;


describe("breadcrumbComponent", () => {
  let router;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        BreadcrumbService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ],
      declarations: [
        RoutingComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent,
        BreadcrumbComponent,
        BreadcrumbPopupStubComponent
      ]
    });
  }));

  describe(`when breadcrumb hasRoutes indicator`, () => {
    let component;

    beforeEach(() => {
      component = new BreadcrumbComponent(null, null, null);
    });
    describe(`when having a visible breadcrumb`, () => {
      it(`should be true when breadcrumbRoutes have a route`, () => {
        component.breadcrumbRoutes = [{breadcrumb: {hide: false}}];
        expect(component.calculateHasRoutes()).toBe(true);
      });
    });
    describe(`when having no breadcrumbs`, () => {
      it(`should be false when has NO shown routes`, () => {
        component.breadcrumbRoutes = [];
        expect(component.calculateHasRoutes()).toBe(false);
      });
    });
    describe(`when having only 1 breadcrumb with 'hide = true'`, () => {
      it(`should be false`, () => {
        component.breadcrumbRoutes = [{breadcrumb: {hide: true}}];
        expect(component.calculateHasRoutes()).toBe(false);
      });
    });
  });
  describe(`when hiding Breadcrumb when nothing to show`, () => {
    let component;

    beforeEach(() => {
      component = new BreadcrumbComponent(null, null, null);
      component.hideWhenNothingToShow = true;
    });
    describe(`when breadcrumb have routes`, () => {
      beforeEach(() => {
        component.breadcrumbRoutes = [{breadcrumb: {hide: false}}];
      });
      it(`should NOT show panel`, () => {
        expect(component.hideBreadcrumb).toBe(false);
      });
    });
    describe(`when breadcrumb have NO routes`, () => {
      beforeEach(() => {
        component.breadcrumbRoutes = [];
      });
      it(`should hide panel`, () => {
        expect(component.hideBreadcrumb).toBe(true);
      });
    });
  });
  describe('when navigation has ended', () => {
    let fixture,
      links,
      linkParam,
      inputBreadcrumbs: BreadcrumbRoute[],
      visibleBreadcrumbs: BreadcrumbRoute[],
      breadcrumbService;

    beforeEach(waitForAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(RoutingComponent);
        router = TestBed.get(Router);

        breadcrumbService = TestBed.get(BreadcrumbService);
        linkParam = {id: 8};
        inputBreadcrumbs = [
          buildBreadcrumbs("url1", undefined),
          buildBreadcrumbs("url1", true),
          buildBreadcrumbs("url3", false),
          buildBreadcrumbs("url4", undefined, linkParam),
        ];
        visibleBreadcrumbs = inputBreadcrumbs.filter(bc => !bc.breadcrumb.hide);
        breadcrumbService.getBreadcrumbs = jasmine.createSpy("getBreadcrumbs").and.returnValue(inputBreadcrumbs);
        router.testEvents = new NavigationEnd(1, "url", "urlAfter");
        fixture.autoDetectChanges();
        const linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        //get the attached link directive instances using the DebugElement injectors
        links = linkDes
          .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
      });
    }));

    describe(`when rendering Breadcrumb panel`, () => {
      let breadcrumbComponent;

      beforeEach(waitForAsync(() => {
        fixture.autoDetectChanges();
        fixture.whenStable().then(() => {
          breadcrumbComponent = fixture.debugElement.query(By.directive(BreadcrumbComponent)).componentInstance;
        });
      }));

      describe(`when should always be shown (default behaviour)`, () => {
        describe(`when having routes`, () => {
          beforeEach(waitForAsync(() => {
            breadcrumbComponent.breadcrumbRoutes = [{breadcrumb: {hide: false}}];
            fixture.autoDetectChanges();
          }));
          it(`should show breadcrumb`, waitForAsync(() => {
            expect(fixture.debugElement.query(By.css('.breadcrumb'))).toBeTruthy();
          }));
        });
        describe(`when having NO routes`, () => {
          beforeEach(waitForAsync(() => {
            breadcrumbComponent.breadcrumbRoutes = [];
            fixture.autoDetectChanges();
          }));
          it(`should show breadcrumb`, waitForAsync(() => {
            expect(fixture.debugElement.query(By.css('.breadcrumb'))).toBeTruthy();
          }));
        });
      });
      describe(`when should shown if NOT empty`, () => {
        beforeEach(waitForAsync(() => {
          breadcrumbComponent.hideWhenNothingToShow = true;
        }));
        describe(`when having routes`, () => {
          beforeEach(waitForAsync(() => {
            breadcrumbComponent.breadcrumbRoutes = [{breadcrumb: {hide: false}}];
            fixture.autoDetectChanges();
          }));
          it(`should show breadcrumb`, waitForAsync(() => {
            expect(fixture.debugElement.query(By.css('.breadcrumb'))).toBeTruthy();
          }));
        });
        describe(`when having NO routes`, () => {
          beforeEach(waitForAsync(() => {
            breadcrumbComponent.breadcrumbRoutes = [];
            fixture.autoDetectChanges();
          }));
          it(`should NOT show breadcrumb`, waitForAsync(() => {
            expect(fixture.debugElement.query(By.css('.breadcrumb'))).toBeFalsy();
          }));
        });
      });
    });

    it('should have 4 links', () => {
      expect(links.length).toBe(4, 'should have 4 links');
    });
    it('should have home as the first link', waitForAsync(() => {
      expect(links[0].linkParams[0]).toBe('', 'should link to Home');
    }));
    it('should bind to routerLink', () => {
      let pos = 0;

      links.map(link => {
        if (pos !== 0) {// the first one is Home
          expect(link.linkParams[0]).toBe(visibleBreadcrumbs[pos - 1].url, 'should bind to url');
          //currently I removed params from the routelink
          //expect(link.linkParams[1]).toBe(visibleBreadcrumbs[pos - 1].params, 'should bind to link param');
        }
        pos++;
      });
    });
    it('should have icon for Home link', () => {
      const pos = 0;
      const aElement = fixture.debugElement.queryAll(el => el.name === "a")[0];
      expect(aElement.nativeElement.innerHTML.indexOf("fa fa-home home-icon")).toBeGreaterThan(-1);
    });

    it('should have text and icon for dynamic links', () => {
      let pos = 0;
      const aElements = fixture.debugElement.queryAll(el => el.name === "a");
      aElements.map(link => {
        if (pos !== 0) {// the first one is Home
          expect(link.nativeElement.innerHTML.indexOf(visibleBreadcrumbs[pos - 1].breadcrumb.label)).toBeGreaterThan(-1);
          expect(link.nativeElement.innerHTML.indexOf(visibleBreadcrumbs[pos - 1].breadcrumb.icon)).toBeGreaterThan(-1);
        }
        pos++;
      });

    });
    it('should have breadcrumbDropDown popup and bind to breadcrumbDropDown', () => {
      const breadcrumbPopups = fixture.debugElement.queryAll(By.directive(BreadcrumbPopupStubComponent));
      expect(breadcrumbPopups.length).toBe(4);
      let pos = 0;
      breadcrumbPopups
        .map(cmp => {
          if (pos > 0) {
            const popup = cmp.componentInstance as BreadcrumbPopupStubComponent;
            expect(popup.breadcrumbDropDown).toBe(visibleBreadcrumbs[pos - 1].breadcrumb.dropDown);
          }
          pos++;
        });
    });

    it('should listen to refresh event', waitForAsync(() => {
      let callsBefore = (breadcrumbService.getBreadcrumbs as Spy).calls.count();
      breadcrumbService.refresh();
      expect(breadcrumbService.getBreadcrumbs).toHaveBeenCalledTimes(callsBefore + 1);
      let breadcrumbComponent = fixture.debugElement.query(By.directive(BreadcrumbComponent)).componentInstance;
      spyOn(breadcrumbComponent, "refreshBreadcrumbRoutes");
      breadcrumbService.refresh();
      expect(breadcrumbComponent.refreshBreadcrumbRoutes).toHaveBeenCalledTimes(1);
    }));
  });

  function buildBreadcrumbs(url: string, visible: boolean, params?): BreadcrumbRoute {
    return {
      breadcrumb: {
        label: url + "_label",
        icon: url + "_icon",
        dropDown: {popupTitle: "aaa"},
        hide: visible,
      },
      params: params,
      url: url
    };
  }
});

//region test components
@Component({
  template: `
    <dcn-breadcrumb></dcn-breadcrumb>
    <router-outlet></router-outlet>
  `
})
class RoutingComponent {
  shouldHide = false;
}

@Component({
  selector: 'dcn-breadcrumb-popup',
  template: ''
})
class BreadcrumbPopupStubComponent {

  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
  @Input()
  isLast: boolean;
}

//endregion
