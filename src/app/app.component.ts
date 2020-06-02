import { Component } from '@angular/core';

import * as moment from 'moment';
import  *  as  data  from  './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any = (data as any).default;
  contents: any;
  start_date: any;
  end_date: any;

  constructor(){
    this.contents = this.data.events;
  }

  ngAfterContentInit(): void {
    this.formatDate();
  }

  filterByDate(){
    let start_at = (this.start_date) ? moment(this.start_date).toDate() : moment("1970-01-01").toDate();
    let end_at = (this.end_date) ? moment(this.end_date).toDate() : moment("2050-01-01").toDate();

    this.contents = this.data.events;

    console.log(this.contents);

    this.contents = this.contents.filter(e=>{
      e.start = moment(e.start).toDate();
      e.end   = moment(e.end).toDate();
      return e.start >= start_at && e.end <= end_at;
    })

  }

  formatDate(){
    this.contents.forEach(e => {
      e.start = new Date(e.start * 1000).toDateString();
      e.end   = new Date(e.end * 1000).toDateString();
    });
  }

}
