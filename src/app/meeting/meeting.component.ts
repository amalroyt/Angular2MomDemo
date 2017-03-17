import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';
import {Http} from '@angular/http';
//import { Router} from '@angular/router';
import { contentHeaders } from '../common/headers';
import { Router, ActivatedRoute, Params} from '@angular/router';

//import {LoginComponent} from './login/login.component';
declare var jQuery: any;
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  a: string;
  meetingInfo = [];
  //  meeting = new Meeting('','','','','','','','','','','','');
  public meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: '', meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '' }];
  //meetings = [];
  public attendees = [];
  types = [];
  facilitator = [];
  recorder = [];
  options = [];
  firstlast = [];
  checked: string[] = [];
  public meeting_id: any;
  public sampleDate: string;

  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) {

    this.sampleDate = new Date().toISOString().slice(0, 10);
    console.log(typeof (this.sampleDate));
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meeting_id = params['id'];
      console.log(this.meeting_id);
    });
    if ((this.meeting_id) != undefined) {
      this.edit_view = 0;
    }

    //jQuery("#datepicker").datepicker();
    //jQuery("#datepicker").datepicker("option", "dateFormat", 'yy-mm-dd');
    //  jQuery("#datepicker").datepicker('setDate', '01/26/2014');
    //console.log("DatePicker", jQuery("#datepicker"));
    this.http.get('http://localhost:8081/getMeetingTypes', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        this.types = response.json();
      },
      error => {
        console.log(error.text());
      }
      );


    this.http.get('http://localhost:8081/getAttendees', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        this.options = response.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.http.get('http://localhost:8081/getMeetingInfo/' + this.meeting_id, { headers: contentHeaders })
      .subscribe(

      response => {

        //  console.log("DatePicker", jQuery( "#datepicker" ));
        // jQuery(function() {
        //   jQuery("#datepicker").datepicker();
        //
        //   jQuery("#datepicker").datepicker("option", "dateFormat", 'yy-mm-dd');
        // });
        console.log(response.json());
        this.meetingInfo = response.json();
        if ((this.meetingInfo).length != 0) {
          //  console.log(this.meetingInfo[0].meetingDate.toISOString().slice(0,10));
          console.log("checked");
          this.meetings = this.meetingInfo[0];


          this.meetings[0] = this.meetingInfo[0];
          console.log(this.meetings[0]);
          //console.log(this.meetings[0].meetingDate.toISOString().slice(0,10));
        } else {
          console.log("New Meeting Value");
        }
        //console.log(this.meetings[0].meetingId);
        for (let i = 0; i < this.meetings[0].meetingAttendees.length; i++) {
          if ((this.meetings[0].meetingAttendees[i]) != ',') {
            //console.log(this.meetings[0].meetingAttendees[i]);
            this.attendees.push(this.meetings[0].meetingAttendees[i])
          }
          //  console.log(this.attendees);
        }
        //console.log(this.attendees.length);
        console.log(this.attendees);


        for (let i = 0; i < this.options.length; i++) {
          console.log(this.options[i].id);
          for (let j = 0; j < this.attendees.length; j++) {



            if (this.options[i].id == this.attendees[j]) {

              console.log("True");
              jQuery("#" + this.attendees[j]).prop("checked", true);
            }
          }
        }



      },
      error => {
        console.log(error.text());
      }
      );

    console.log(this.firstlast);




    this.http.get('http://localhost:8081/getFaci', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        this.facilitator = response.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.http.get('http://localhost:8081/getRec', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        this.recorder = response.json();
      },
      error => {
        console.log(error.text());
      }
      );
    this.a = "Hello";

  }
  updateChecked(option, event) {
    console.log('event.target.value ' + event.target.value);
    var index = this.checked.indexOf(option);
    if (event.target.checked) {
      console.log('add');
      if (index === -1) {
        this.checked.push(option);
      }
    } else {
      console.log('remove');
      if (index !== -1) {
        this.checked.splice(index, 1);
      }
    }
    //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
    console.log(this.checked);

  }




  //  meeting = new Meeting('','','','','','','','','','','');
  submitted = false;
  edit_view = 1;

  onSubmit(meeting) {
    //var arrObj =[];
    // jQuery(function() {
    //   jQuery("#datepicker").datepicker();
    //   jQuery("#datepicker").datepicker("option", "dateFormat", 'yy-mm-dd');
    //   //jQuery("#datepicker").datepicker('setDate', meetings.meetingDate);
    // });
    // console.log(jQuery("#datepicker").val());

    //meeting.meetingDate = jQuery("#datepicker").datepicker( "option", "dateFormat", 'yy-mm-dd' ).val();
  		this.submitted = true;

    meeting.meeting_attendees = JSON.stringify(this.checked);
    console.log(JSON.stringify(meeting.meeting_attendees));
    console.log(meeting.meetingStatus);
    console.log(meeting);

    var meetingObj = {
      //id: req.body.meeting_id,
      status: meeting.meetingStatus,
      type: meeting.meetingType,
      title: meeting.meetingTitle,
      purpose: meeting.meetingPurpose,
      facilitator: meeting.meetingFacilitator,
      recorder: meeting.meetingRecorder,
      venue: meeting.meetingVenue,
      date: meeting.meetingDate,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      agenda: meeting.meetingAgenda,
      attendees: meeting.meeting_attendees
    }



    this.http.post('http://localhost:8081/postMeeting', JSON.stringify(meetingObj), { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        window.alert("Meeting Added!!");
      },
      error => {
        console.log(error.text());
        window.alert("Please Enter Valid details");
      }
      );

    jQuery("#createsuccess").css("display", "block");
    // this.reset();
  }
  reset() {

    this.meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: '', meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '' }];
    this.meetings[0].meetingDate = '';
    //jQuery("#datepicker").datepicker('setDate', '');
  }
  numarr = [];


  edit(meetings) {


    /*  jQuery( function() {
       jQuery( "#datepicker" ).datepicker();
       jQuery("#datepicker").datepicker('setDate', meetings.meetingDate);
        jQuery("#datepicker").datepicker( "option", "dateFormat", 'yy-mm-dd');
      } );
  */



    console.log(this.attendees);
    this.attendees.pop();
    this.attendees.shift();
    console.log(this.attendees);
    this.numarr = this.attendees.map(Number);
    console.log(this.numarr);
    console.log(this.checked);

    for (let i = 0; i < this.numarr.length; i++) {
      this.checked.push(this.numarr[i]);
    }
    //  this.edit_view = 0;
    //  meetings.meeting_attendees = JSON.stringify(this.attendees);
    console.log(this.checked);
    meetings.meetingAttendees = JSON.stringify(this.checked);
    console.log(JSON.stringify(meetings.meetingAttendees));
    console.log(meetings);
    console.log(this.meeting_id);
    //meetings.meetingDate = jQuery("#datepicker").datepicker("option", "dateFormat", 'yy-mm-dd').val();
    var meetingObj = {
      id: this.meeting_id,
      status: meetings.meetingStatus,
      type: meetings.meetingType,
      title: meetings.meetingTitle,
      purpose: meetings.meetingPurpose,
      facilitator: meetings.meetingFacilitator,
      recorder: meetings.meetingRecorder,
      venue: meetings.meetingVenue,
      date: meetings.meetingDate,
      startTime: meetings.startTime,
      endTime: meetings.endTime,
      agenda: meetings.meetingAgenda,
      attendees: meetings.meetingAttendees
    }

    this.http.put('http://localhost:8081/updateMeeting', JSON.stringify(meetingObj), { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        window.alert("Meeting Updated!!");
      },
      error => {
        console.log(error.text());
        window.alert("Please Enter Valid details");
      }
      );
    //  alert("Updated");
    jQuery("#editsuccess").css("display", "block");


  }
  ngOnInit() {


  }

}
