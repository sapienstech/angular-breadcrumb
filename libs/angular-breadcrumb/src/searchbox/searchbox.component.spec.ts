import {TestBed, async, ComponentFixture, fakeAsync, tick} from "@angular/core/testing";
import {Component} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of"
import {CommonModule} from "@angular/common";
import {SearchBoxComponent} from "./searchbox.component";

describe("BreadcrumbRoute Popup Component", () => {
  let fixture: ComponentFixture<TestComponent>;
  let testCmp;
  let input: HTMLInputElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      providers: [],
      declarations: [
        TestComponent, SearchBoxComponent
      ]
    });
  }));

  describe('when all search box inputs are supplied', () => {
    beforeEach(async(() => {
      TestBed.compileComponents().then(() => {
        createComponent();
        input = fixture.debugElement.query(By.css("input")).nativeElement;
      });
    }));
    it('should call on loading true/search/on loading false and result', fakeAsync(() => {
      testCmp.searchDataMocked = [{a: 1, b: 2}];
      sendKeyUp("e");
      fixture.detectChanges();
      testCalledParameter(ON_LOADING, true);
      testCalledParameter(ON_SEARCH_DATA, "e");
      testCalledParameter(ON_LOADING, false);
      testCalledParameter(ON_SEARCH_RESULT, testCmp.searchDataMocked);
      expect(testCmp.calledMethodAndParam.length).toBe(0);
    }));
    it('should NOT call on search result in case of an error', fakeAsync(() => {
      testCmp.searchDataMocked = [{a: 1, b: 2}];
      sendKeyUp(ON_ERROR_STRING);
      fixture.detectChanges();
      testCalledParameter(ON_LOADING, true);
      testCalledParameter(ON_SEARCH_DATA, ON_ERROR_STRING);
      testCalledParameter(ON_LOADING, false);
      expect(testCmp.calledMethodAndParam.length).toBe(0);
    }));
    it('should have focus in the input field',()=>{
      let element = fixture.nativeElement.querySelector("input");
      expect(document.activeElement).toBe(element);
    });

  });
  describe('when there is no input for search data function', () => {

    beforeEach(async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `<dcn-search-box *ngIf="keepMeAlive"
                [maxResults]="3" [minLength]="0" (results)="onSearchResult($event)" (loading)="onLoading($event)"
                    > </dcn-search-box>`
        }
      });
      TestBed.compileComponents().then(() => {
        createComponent();
        input = fixture.debugElement.query(By.css("input")).nativeElement;
      });
    }));
    it('should support search box without supplying searchData function', fakeAsync(() => {
      testCmp.searchDataMocked = [{a: 1, b: 2}];
      sendKeyUp("e");
      fixture.autoDetectChanges();
      fixture.whenStable().then(() => {
        testCalledParameter(ON_LOADING, true);
        //no call for search data since it has its owen function
        testCalledParameter(ON_LOADING, false);
        testCalledParameter(ON_SEARCH_RESULT, []);
        expect(testCmp.calledMethodAndParam.length).toBe(0);
      });
    }));
  });

  function sendKeyUp(inputValue: string) {
    input.value = inputValue;
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    simulateKeyUpevent(input, inputValue);
    tick(500);
  }

  function testCalledParameter(method: string, parameter: any) {
    expect(testCmp.calledMethodAndParam[0].method).toBe(method);
    expect(testCmp.calledMethodAndParam[0].parameter).toEqual(parameter);
    testCmp.calledMethodAndParam.splice(0, 1);
  }

  function simulateKeyUpevent(element, keyCode) {
    let eventObj: any = document.createEvent("Events");

    if (eventObj.initEvent) {
      eventObj.initEvent("keyup", true, true);
    }
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    element.dispatchEvent ? element.dispatchEvent(eventObj) : element.fireEvent("keyup", eventObj);
  }

  function createComponent() {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    testCmp = fixture.debugElement.componentInstance;
    testCmp.clearTrace();
  }
});

const ON_LOADING = "onloading";
const ON_SEARCH_DATA = "onDearchData";
const ON_SEARCH_RESULT = "onDearchResult";
const ON_ERROR_STRING = "ON_ERROR_STRING";
//region test components
@Component({
  template: `

      <dcn-search-box *ngIf="keepMeAlive"
         [searchData]="searchService"
         [maxResults]="3"
         [minLength]="0"
         (results)="onSearchResult($event)"
         (loading)="onLoading($event)"
      >
      </dcn-search-box>
  `
})
class TestComponent {
  searchResult: any;
  loading: boolean;
  calledMethodAndParam: TraceData[] = [];
  searchDataMocked: any;
  keepMeAlive = true;

  constructor() {
    this.keepMeAlive = true;
    this.calledMethodAndParam = [];
    this.searchService = this.searchService.bind(this);
  }

  searchService(query: string, maxResult: number): Observable<any[]> {
    this.calledMethodAndParam.push(new TraceData(ON_SEARCH_DATA, query));
    if (query == ON_ERROR_STRING) {
      throw "something went wrong";
    }
    return Observable.of(this.searchDataMocked);
  }

  onSearchResult(filteredData) {
    this.calledMethodAndParam.push({method: ON_SEARCH_RESULT, parameter: filteredData});
    this.searchResult = filteredData;
  }

  onLoading(val) {
    this.calledMethodAndParam.push(new TraceData(ON_LOADING, val));
    this.loading = val;
  }

  clearTrace() {
    this.calledMethodAndParam = [];
  }

}
class TraceData {
  method: string;
  parameter: any;

  constructor(method: string, parameter: any) {
    this.method = method;
    this.parameter = parameter;
  }
}
//endregion
