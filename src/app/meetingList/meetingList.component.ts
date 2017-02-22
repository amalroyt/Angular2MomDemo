import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Meeting} from './meetingList';
import { Router, CanActivate } from '@angular/router';
@Component({
  selector: 'app-meetingList',
  templateUrl: './meetingList.component.html',
  styleUrls: ['./meetingList.component.css'],
  providers: []
})
export class MeetingListComponent {
  public meetingList: Meeting[];
  constructor(private http: Http, private router: Router) {
    this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
      .subscribe(
      response => {
        this.meetingList = response.json();
      },
      error => {
        console.log(error.text());
      });
  }
  //To fetch more details of the selected meeting
  moreDetails: (id: number) => void
  = function(id: number): void {
    this.router.navigate(['/moreDetails', id]);
  }
  //To generate excel for the selected meeting
  generateExcel: (meetingId: string) => void
  = function(meetingId: string): void {
    this.http.post('http://localhost:8081/generateExcel/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        alert("Excel file generated Successfully!");
        this.meetingList = response.json();
      },
      error => {
        console.log(error.text());
      });
  }
  //To download excel for the selected meeting
  downloadExcel: (meetingTitle: string) => void
  = function(meetingTitle: string): void {
    this.http.get('http://localhost:8081/download/' + meetingTitle, { headers: contentHeaders })
      .subscribe(
      response => {
        window.location.href = "http://localhost:8081/download/" + meetingTitle;
      },
      error => {
        console.log(error.text());
      });
  }
}
