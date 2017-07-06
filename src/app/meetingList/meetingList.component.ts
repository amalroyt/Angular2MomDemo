import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Meeting} from './meetingList';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { ServerAddress } from '../common/serverAddress';
import { GoogleAnalyticsEventsService } from "../services/google-analytics-events.service";
declare var jQuery: any;
@Component({
  selector: 'app-meetingList',
  templateUrl: './meetingList.component.html',
  styleUrls: ['./meetingList.component.css'],
  providers: []
})
export class MeetingListComponent {
  public meetingList;
  public searchText: "";
  public meetingListCall;
  public meetingId: number;
  public userId = this.authService.getUserdetails();
  userName = this.userId.firstName + " " + this.userId.lastName;
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    this.meetingListCall = function() {
      this.http.get(ServerAddress + '/meetingList', { headers: contentHeaders })
        .subscribe(
        response => {
          this.meetingList = response.json();
        },
        error => {
          console.log(error.text());
        });
    }
    this.meetingListCall();

      var emitPageUserName = "Meeting List"+" || "+ this.userName;
      //set pageView tracker
      this.googleAnalyticsEventsService.emitPageView(emitPageUserName);
  }


  //To open create new meeting form
  edit: (id: number) => void
  = function(id: number): void {
    this.router.navigate(['/meeting', id]);
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

  // search: () => any
  // = function(): any {
  //   var self = this;
  //   if (self.searchText) {
  //     this.meetingList1 = this.meetingList.filter(function(meeting: Meeting) {
  //       return meeting.meetingTitle.indexOf(self.searchText) != -1 ;
  //     });
  //   } else {
  //     this.meetingList1 = this.meetingList;
  //     return false;
  //   }
  // }

  //To generate excel for the selected meeting
  generateExcel: (meetingId: string) => void
  = function(meetingId: string): void {
    //document.getElementById("errorId").innerHTML = "";
    this.http.post(ServerAddress + '/generateExcel/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        //To update the meetinglist after generating excelsheet operation.
        this.http.get(ServerAddress + '/meetingList', { headers: contentHeaders })
          .subscribe(
          response => {
            this.meetingList = response.json();
            document.getElementById("successId").innerHTML = "Excel generated successfully.";
            this.googleAnalyticsEventsService.emitEvent('Meeting List', 'Exel Generated', 'Meeting Id', meetingId);
            setTimeout(function() {
              document.getElementById("successId").innerHTML = "";
            }, 5000);
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
    this.http.get(ServerAddress + '/download/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        window.location.href = ServerAddress + "/download/" + meetingId;
        document.getElementById("successId").innerHTML = "Download successfull.";
        this.googleAnalyticsEventsService.emitEvent('Meeting List', 'Excel Download', 'Meeting Id', meetingId);
        setTimeout(function() {
          document.getElementById("successId").innerHTML = "";
        }, 5000);
      },
      error => {
        this.meetingListCall();
        document.getElementById("errorId").innerHTML = "File not available, Kindly generate it again..";
        setTimeout(function() {
          document.getElementById("errorId").innerHTML = "";
        }, 5000);
        console.log(error.text());
      });
  }

  //To delete selected meetingList
  toDelete: () => void
  = function(): void {
    //document.getElementById("errorId").innerHTML = "";
    var userId = this.authService.getUserdetails().userId;
    var meetingIds = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get();
    if (meetingIds.length != 0) {

    //To delete the selected meetings
    this.http.put(ServerAddress + '/deleteMeeting/' +userId,JSON.stringify({meetingIds:meetingIds}), { headers: contentHeaders })
      .subscribe(
      response => {

        //To update the meetinglist after deletion operation.
        this.http.get(ServerAddress + '/meetingList', { headers: contentHeaders })
          .subscribe(
          response => {
            var userMeetingId = this.userName + " - " + meetingIds;
            this.googleAnalyticsEventsService.emitEvent('Meeting List', 'Meeting Deleted', 'User - MeetingId', userMeetingId);
            this.meetingList = response.json();
            document.getElementById("successId").innerHTML = "Selected meetings deleted successfully.";
            setTimeout(function() {
              document.getElementById("successId").innerHTML = ""; }, 5000);
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
      document.getElementById("errorId").innerHTML = "Select atleast a meeting to delete.";
      setTimeout(function() {
        document.getElementById("errorId").innerHTML = "";
      }, 5000);
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
  }
}
