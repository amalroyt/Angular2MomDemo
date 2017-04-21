
import {OnInit, OnDestroy, Component} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders } from '../common/headers';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MoreDetails} from './moreDetails/moreDetailsList';
import {MoreDetailsPoints} from './moreDetailsPoints/moreDetailsPointsList';
import {MoreDetailsAction} from './moreDetailsAction/moreDetailsActionList';
declare var d3: any;

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
  ngOnInit() { }
  constructor(private http: Http, private activatedRoute: ActivatedRoute, private router: Router) {
	d3.select("svg").remove();
	document.getElementById("errorId").innerHTML = "";
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingId = params['id'];
    });
    //To get the meeting details
    this.http.get('http://localhost:8081/moreDetails/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsList = response.json();
      },
      error => {
        console.log(error.text());
      });
    //To get the meeting discussion points details
    this.http.get('http://localhost:8081/moreDetailsPoints/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsPointsList = response.json();
      },
      error => {
        console.log(error.text());
      });
    //To get the meeting action details
    this.http.get('http://localhost:8081/moreDetailsAction/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsActionList = response.json();
      },
      error => {
        console.log(error.text());
      });
    //To get the history of MOM's generated
    this.http.get('http://localhost:8081/moreDetailsHistory/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsHistoryList = response.json();
      },
      error => {
        console.log(error.text());
      });
  }

  //To download previous MOM's
  downloadPrevExcel: (fileName: string) => void
  = function(fileName: string): void {
    var download = JSON.stringify({fileName:fileName,meetingId:this.meetingId});
    this.http.get('http://localhost:8081/downloadPrev/'+download, { headers: contentHeaders })
      .subscribe(
      response => {
         window.location.href = "http://localhost:8081/downloadPrev/"+download;
        document.getElementById("successId").innerHTML = "Download successfull.";
        setTimeout(function() {
          document.getElementById("successId").innerHTML = ""; }, 5000);
      },
      error => {
        console.log(error.text());
      });
  }
}
