
import {OnInit, OnDestroy, Component} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MoreDetails} from './moreDetails/moreDetailsList';
import {MoreDetailsPoints} from './moreDetailsPoints/moreDetailsPointsList';
import {MoreDetailsAction} from './moreDetailsAction/moreDetailsActionList';
import {ServerAddress} from '../common/serverAddress';
import { GoogleAnalyticsEventsService } from "../services/google-analytics-events.service";
import { AuthenticationService } from '../services/auth.service';


@Component({
  selector: 'app-moreDetails',
  templateUrl: './moreDetails.component.html',
  styleUrls: ['./moreDetails.component.css'],
  providers: []
})
export class MoreDetailsComponent implements OnInit {
  public moreDetailsList: MoreDetails[];
  public moreDetailsPointsList: MoreDetailsPoints[];
  public moreDetailsActionList: MoreDetailsAction[];
  public moreDetailsHistoryList: any;
  public meetingId: number;
  public moreDetailsListCall;
  public userId = this.authService.getUserdetails();
  userName = this.userId.firstName + " " + this.userId.lastName;
  ngOnInit() { }

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthenticationService, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {

    document.getElementById("errorId").innerHTML = "";
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingId = params['id'];
    });
    this.moreDetailsListCall = function() {
      //To get the meeting details
      this.http.get(ServerAddress + '/moreDetails/' + this.meetingId, { headers: contentHeaders })
        .subscribe(
        response => {
          this.moreDetailsList = response.json();
        },
        error => {
          console.log(error.text());
        });
      //To get the meeting discussion points details
      this.http.get(ServerAddress + '/moreDetailsPoints/' + this.meetingId, { headers: contentHeaders })
        .subscribe(
        response => {
          this.moreDetailsPointsList = response.json();
        },
        error => {
          console.log(error.text());
        });
      //To get the meeting action details
      this.http.get(ServerAddress + '/moreDetailsAction/' + this.meetingId, { headers: contentHeaders })
        .subscribe(
        response => {
          this.moreDetailsActionList = response.json();
        },
        error => {
          console.log(error.text());
        });
      //To get the history of MOM's generated
      this.http.get(ServerAddress + '/moreDetailsHistory/' + this.meetingId, { headers: contentHeaders })
        .subscribe(
        response => {
          this.moreDetailsHistoryList = response.json();
        },
        error => {
          console.log(error.text());
        });
    }
    this.moreDetailsListCall();
      var emitPageUserName = "More Details"+" || "+ this.userName;
      //set pageView tracker
      this.googleAnalyticsEventsService.emitPageView(emitPageUserName);
  }

  //To download previous MOM's
  downloadPrevExcel: (fileName: string) => void
  = function(fileName: string): void {
    var download = JSON.stringify({ fileName: fileName, meetingId: this.meetingId });
    this.http.get(ServerAddress + '/downloadPrev/' + download, { headers: contentHeaders })
      .subscribe(
      response => {
         this.googleAnalyticsEventsService.emitEvent('More Details', 'Excel Download', 'Meeting Id', this.meetingId);
        window.location.href = ServerAddress + "/downloadPrev/" + download;
        document.getElementById("successId").innerHTML = "Download successfull.";
        setTimeout(function() {
          document.getElementById("successId").innerHTML = "";
        }, 5000);
      },
      error => {
        this.moreDetailsListCall();
        document.getElementById("errorId").innerHTML = "Download Failed.";
        setTimeout(function() {
          document.getElementById("errorId").innerHTML = "";
        }, 5000);
        console.log(error.text());
      });
  }
}
