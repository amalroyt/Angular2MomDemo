import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Meeting} from './meetingList';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

declare var jQuery: any;
@Component({
  selector: 'app-meetingList',
  templateUrl: './meetingList.component.html',
  styleUrls: ['./meetingList.component.css'],
  providers: []
})
export class MeetingListComponent {
  public meetingList: Meeting[];
  public userId = this.authService.getUserdetails();
  public searchText: "";

  constructor(private http: Http, private router: Router, private authService: AuthenticationService) {
    this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
      .subscribe(
      response => {
        this.meetingList = response.json();
        this.search();
      },
      error => {
        console.log(error.text());
      });
  }

  // To open create new meeting form
  edit: (id: number) => void
  = function(id: number): void {
    this.router.navigate(['/meeting',id]);
  }

  //To open actionDiscussion form
  openActionDiscussionForm: (id: any) => void
  = function(id: any): void {
    this.router.navigate(['/actionDiscussion', id]);
  }

  //To fetch more details of the selected meeting
  moreDetails: (id: number) => void
  = function(id: number): void {
    this.router.navigate(['/moreDetails', id]);
  }

  search: () => void
  = function() {
    var self = this;
    if (self.searchText) {
      this.meetingList1 = this.meetingList.filter(function(meeting: Meeting) {
        return meeting.meetingTitle.indexOf(self.searchText) != -1 ;
      });
    } else {
      this.meetingList1 = this.meetingList;
    }
  }
  //To generate excel for the selected meeting
  generateExcel: (meetingId: string) => void
  = function(meetingId: string): void {
    //document.getElementById("errorId").innerHTML = "";
    this.http.post('http://localhost:8081/generateExcel/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        //To update the meetinglist after generating excelsheet operation.
        this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
          .subscribe(
          response => {
            this.meetingList1 = response.json();
            document.getElementById("errorId").innerHTML = "Excel generated successfully.";
          },
          error => {
            console.log(error.text());
          });
      },
      error => {
        console.log(error.text());
      });
  }

  //To download excel for the selected meeting
  downloadExcel: (meetingId: number) => void
  = function(meetingId: number): void {
    //document.getElementById("errorId").innerHTML = "";
    this.http.get('http://localhost:8081/download/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        window.location.href = "http://localhost:8081/download/" + meetingId;
        document.getElementById("errorId").innerHTML = "Download successfull.";
      },
      error => {
        console.log(error.text());
      });
  }

  //To delete selected meetingList
  toDelete: () => void
  = function(): void {
    //document.getElementById("errorId").innerHTML = "";
    var userId = this.userId.userId;
    var meetingIds = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get();
    if (meetingIds.length != 0) {
    //To delete the selected meetings
    this.http.put('http://localhost:8081/deleteMeeting/' +userId,JSON.stringify({meetingIds:meetingIds}), { headers: contentHeaders })
      .subscribe(
      response => {
        //To update the meetinglist after deletion operation.
        this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
          .subscribe(
          response => {
            this.meetingList1 = response.json();
            document.getElementById("errorId").innerHTML = "Selected meetings deleted successfully.";
          },
          error => {
            console.log(error.text());
          });
      },
      error => {
        console.log(error.text());
      });
    }
    else {
      document.getElementById("errorId").innerHTML = "Selected atleast a meeting to delete.";
    }
  }

  // to select/deselect all meetinglist
checkAll: () => any
= function() {
  jQuery(document).on('click', '#check', function(event) {
    if (!event.isPropagationStopped()) {
      event.stopPropagation();
      if ((jQuery(this).val()) == 'Check All Rows') {
        jQuery('.deleteCheckbox').prop('checked', true);
        jQuery(this).val('Uncheck All Rows');
      } else {
        jQuery('.deleteCheckbox').prop('checked', false);
        jQuery(this).val('Check All Rows');
      }
    }
  });
};
}
