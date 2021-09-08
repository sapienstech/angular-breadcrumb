
import {of as observableOf, merge as observableMerge, fromEvent as observableFromEvent, Observable} from 'rxjs';

import {switchAll, map, filter, debounceTime, tap } from 'rxjs/operators';
import {Component, OnInit, EventEmitter, ElementRef, Input, Output, ViewChild} from "@angular/core";


@Component({
  selector: 'dcn-search-box',
  styleUrls:['../breadcrumb/component/breadcrumb.component.less'],
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

  filterText: string = "";


  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(private el: ElementRef) {
    this.minLength = 1;
    this.maxResults = Number.MAX_SAFE_INTEGER;
  }

  ngOnInit(): void {
    this.input.nativeElement.focus();
    let keyUp = observableFromEvent(this.input.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length >= this.minLength),
      debounceTime(250),);

    let search = observableFromEvent(this.input.nativeElement, "search").pipe(
      tap(() => this.filterText = ""),
      map(e => ""),);


    observableMerge(keyUp, search).pipe(
      tap(() => this.loading.next(true)),
      map((query: string) =>
        this.searchData ? this.searchData(query, this.maxResults) : observableOf([])),
      switchAll(),)
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
