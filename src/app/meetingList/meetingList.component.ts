import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Meeting} from './meetingList';
import {MeetingListService} from './meetingList.service';
@Component({
  selector: 'app-meetingList',
  templateUrl: './meetingList.component.html',
  styleUrls: ['./meetingList.component.css'],
  providers: [MeetingListService]
})
export class MeetingListComponent {
  public meetingList: Meeting[];
  constructor(private _meetingListService: MeetingListService) {
    this.getMeetingList();
  }
  getMeetingList() {
    this._meetingListService.getMeetingList().then((meetingList: Meeting[]) => this.meetingList = meetingList);
  }
  goDetails() {
      console.log("hi");
    window.location.href='http://localhost:4200/moreDetails';
    console.log("hello");
  }
}
