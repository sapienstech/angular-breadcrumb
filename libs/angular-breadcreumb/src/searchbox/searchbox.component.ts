import {Component, OnInit, EventEmitter, ElementRef, Input, Output, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/switch";
import "rxjs/add/operator/filter";
@Component({
  moduleId: ""+module.id,
  selector: 'dcn-search-box',
  styleUrls:['../../../../angular-breadcrumb/libs/ngx-tabs-lib/src/breadcrumb/breadcrumb.component.css'],
  template: `
        <div class="search-box">
            <input #input type="search"
                [value]="filterText" 
                (input)="filterText = $event.target.value"
                class="input-class" 
                placeholder="search"
                 />
        </div>
  `
})
export class SearchBoxComponent implements OnInit {

  @Input()
  maxResults: number;
  @Input()
  minLength: number;
  /**the minimum input length to trigger the search**/
  @Input()
  searchData: (string, int) => Observable<any>;
  @Output()
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  results: EventEmitter<any[]> = new EventEmitter<any[]>();

  private filterText: string = "";


  @ViewChild('input') input: ElementRef;

  constructor(private el: ElementRef) {
    this.minLength = 1;
    this.maxResults = Number.MAX_SAFE_INTEGER;
  }

  ngOnInit(): void {
    this.input.nativeElement.focus();
    let keyUp = Observable.fromEvent(this.input.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length >= this.minLength)
      .debounceTime(250);

    let search = Observable.fromEvent(this.input.nativeElement, "search")
      .do(() => this.filterText = "")
      .map(e => "");


    Observable.merge(keyUp, search)
      .do(() => this.loading.next(true))
      .map((query: string) =>
        this.searchData ? this.searchData(query, this.maxResults) : Observable.of([]))
      .switch()
      .subscribe(
        (results: any[]) => {
          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => {
          this.loading.next(false);
        }
      );
  }
}
