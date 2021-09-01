import {HighlightCurrentOpenedItemDirective} from './highlight-current-opened-item.directive';
import {ComponentFixture, fakeAsync, getTestBed, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {BreadcrumbDropDownItem} from "angular-breadcrumb";
import {By} from '@angular/platform-browser';
import {convertToParamMap} from "@angular/router";

describe('HighlightCurrentOpenedItemDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  const configureTestSuite = (configureAction?: () => void) => {
    const testBedApi: any = getTestBed();
    const originReset = TestBed.resetTestingModule;

    beforeAll(() => {
      TestBed.resetTestingModule();
      TestBed.resetTestingModule = () => TestBed;
    });

    if (configureAction) {
      beforeAll((done: DoneFn) => (async () => {
        configureAction();
        await TestBed.compileComponents();
      })().then(done).catch(done.fail));
    }

    afterEach(() => {
      testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
      testBedApi._instantiated = false;
    });

    afterAll(() => {
      TestBed.resetTestingModule = originReset;
      TestBed.resetTestingModule();
    });
  };
  const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

  @Component({
    selector: 'test-component',
    template: ``
  })
  class TestComponent {
    dropDownItems: BreadcrumbDropDownItem[] = [{
      label: 'first element',
      url: '/firstElement',
      icon: 'firstElement-icon',
      breadCrumbIdentifierAndIdPair: {itemId: 1234, breadcrumbIdentifier: 'projectId'},
    }, {
      label: 'second element',
      url: '/secondElement',
      icon: 'secondElement-icon',
      breadCrumbIdentifierAndIdPair: {itemId: 1224, breadcrumbIdentifier: 'projectId'},
    }];
    paramMap = convertToParamMap({'projectId': '1234'});

  }

  describe('when passed element is opened by default', () => {
    configureTestSuite((() => {
      let template = `
                    <div *ngFor="let nextLink of dropDownItems">
                         <a class="spec-anchor" highlightCurrentOpenedItem [pathParamMap]=paramMap [dropDownItem]=nextLink  >
                       </a>
                    </div>`;
      TestBed.configureTestingModule({
        declarations: [TestComponent, HighlightCurrentOpenedItemDirective],
        providers: []
      });
      TestBed.overrideComponent(TestComponent, {set: {template: `${template}`}});
    }));
    beforeEach(fakeAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    }));
    it('should highlight the current opened item', () => {
      expect(rgb2hex(fixture.debugElement.query(By.css('.spec-anchor')).nativeElement.style.backgroundColor)).toBe('#eeeeee');
    });
  });
});


