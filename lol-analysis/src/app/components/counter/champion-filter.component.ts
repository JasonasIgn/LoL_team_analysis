import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-filter',
  template: `
  <input class="form-control mr-sm-2" (keyup)="onKey($event)"  style="width: 200px;" id="searchField" type="text" placeholder="Filter champions">
    `
})

export class ChampionFilterComponent implements OnInit {

  @Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onKey(event: any) { 
    this.filterEvent.emit((document.getElementById("searchField") as HTMLInputElement).value);
  }

}
