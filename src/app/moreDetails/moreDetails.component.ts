
import {OnInit, OnDestroy, Component} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MoreDetails} from './moreDetails/moreDetailsList';
import {MoreDetailsPoints} from './moreDetailsPoints/moreDetailsPointsList';
import {MoreDetailsAction} from './moreDetailsAction/moreDetailsActionList';


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

  ngOnInit() { }
  constructor(private http: Http, private activatedRoute: ActivatedRoute) {
    document.getElementById("errorId").innerHTML = "";
    var meetingId;
    this.activatedRoute.params.subscribe((params: Params) => {
      meetingId = params['id'];
      console.log("meetingId  "+meetingId);
    });
    //To get the meeting details
    this.http.get('http://localhost:8081/moreDetails/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsList = response.json();
      },
      error => {
        console.log(error.text());
      });
    //To get the meeting discussion points details
    this.http.get('http://localhost:8081/moreDetailsPoints/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsPointsList = response.json();
      },
      error => {
        console.log(error.text());
      });
    //To get the meeting action details
    this.http.get('http://localhost:8081/moreDetailsAction/' + meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsActionList = response.json();
      },
      error => {
        console.log(error.text());
      });
  }
}
