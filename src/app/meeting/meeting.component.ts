import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
//import {LoginComponent} from './login/login.component';
declare var jQuery: any;
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  meetingInfo = [];

  public time = {
    hours :  ["01","02","03","04","05","06","07","08","09","10","11","12"],//[1,2,3,4,5,6,7,8,9,10,11,12]
    minutes : ["00","15","30","45"],
    form : ["AM","PM"]
  };
  public userId = this.authService.getUserdetails();
  userName = this.userId.firstName + " " + this.userId.lastName ;
  public meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: this.userName, meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '',startHours :'',startMinutes:'',startForm:'',endHours :'',endMinutes:'', endForm:''}];



  public attendees = [];
  types = [];
  facilitator = [];
  recorder = [];
  options = [];
  firstlast = [];
  checked: string[] = [];
  public meeting_id: any;

  timeArr = [];
  endtimeArr = [];
  unchecked = [];
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {

 
  document.getElementById("errorId").innerHTML = "";
    jQuery("#editsuccess").css("display", "none");
    jQuery("#createsuccess").css("display", "none");
    console.log("User ID", this.userId.userId);
    console.log("Recorder", this.userId.firstName + " " + this.userId.lastName );


  public userId = this.authService.getUserdetails();
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {
    console.log("User ID", this.userId.userId);


  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) {

   


    this.activatedRoute.params.subscribe((params: Params) => {
      this.meeting_id = params['id'];
      console.log(this.meeting_id);
    });
    if ((this.meeting_id) != undefined) {
      this.edit_view = 0;
    }
   
    this.http.get('http://localhost:8081/getMeetingTypes', { headers: contentHeaders })
      .subscribe(
      response => {
        //console.log(response.json());
        this.types = response.json();
      },
      error => {
        console.log(error.text());
      }
      );
    this.http.get('http://localhost:8081/getAttendees', { headers: contentHeaders })
      .subscribe(
      response => {
        
        this.options = response.json();
        
      },
      error => {
        console.log(error.text());
      }
      );
    this.http.get('http://localhost:8081/getMeetingInfo/' + this.meeting_id, { headers: contentHeaders })
      .subscribe(
      response => {
        this.meetingInfo = response.json();
        if ((this.meetingInfo).length != 0) {
         
          console.log("checked");
          this.meetings = this.meetingInfo[0];
          this.meetings[0] = this.meetingInfo[0];

          console.log(JSON.stringify(this.meetings[0].startTime));
          this.timeArr = (this.meetings[0].startTime).split(":");
          console.log(this.timeArr);
          //this.timeArr = this.timeArr.map(Number);
          console.log(this.timeArr);
          this.meetings[0].startHours = this.timeArr[0];
          this.meetings[0].startMinutes = this.timeArr[1];

          this.endtimeArr = (this.meetings[0].endTime).split(":");
          console.log(this.endtimeArr);
          //this.endtimeArr = this.endtimeArr.map(Number);
          console.log(this.endtimeArr);
          this.meetings[0].endHours = this.endtimeArr[0];
          this.meetings[0].endMinutes = this.endtimeArr[1];
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

        this.attendees = this.attendees.map(Number);
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
}
  updateChecked: (option, event) => any
  = function(option, event) {

    console.log('event.target.value ' + event.target.value);
    var index = this.checked.indexOf(option);
    if (event.target.checked) {
      console.log('add');
      if (index === -1) {
        this.checked.push(option);
        //this.unchecked.splice(index, 1);
      }
    } else {
      console.log('remove');
      if (index !== -1) {
        this.checked.splice(index, 1);
      //  this.unchecked.push(option)
      }
    }

    var indexValue = jQuery('input:checkbox:not(:checked)').map(function() {
      return jQuery(this)[0].id;
    }).get();
    var abc =indexValue.map(Number);
for ( var i in abc ) {
  for(var j in this.attendees)
  {
      if (this.attendees[j] == abc[i])  {
        console.log(abc[i]);
        this.attendees.splice(this.attendees.indexOf(abc[i]), 1);
      }
  }
}
console.log(this.attendees);


    //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
    // console.log(this.checked);
    // console.log(this.unchecked);
    // for(let i = 0 ; i < this.options.length ; i++){
    //       for(let j = 0 ; j < this.checked.length ; j++){
    //         if(this.options[i].id == this.checked[j])
    //         {
    //             this.unchecked.splice(j, 1);
    //           //console.log(this.checked[j] + "True");
    //         }
    //       }
    // }
    // console.log(this.unchecked);
  }
  sample = [];
  submitted = false;
  edit_view = 1;
  dateArr = [];
  Date1 = new Date();
  Date2 = new Date();
  onSubmit: (meeting) => any
  = function(meeting) {
    console.log(meeting.meetingDate);
    this.dateArr =meeting.meetingDate.split("-");
    console.log(this.dateArr[0],this.dateArr[1],this.dateArr[2]);

    console.log(this.dateArr[0],this.dateArr[1],this.dateArr[2],meeting.startHours,meeting.startMinutes);
    this.Date1 = new Date(this.dateArr[0],this.dateArr[1],this.dateArr[2],meeting.startHours,meeting.startMinutes);
    console.log(this.Date1);

    this.Date2 = new Date(this.dateArr[0],this.dateArr[1],this.dateArr[2],meeting.endHours,meeting.endMinutes);
    console.log(this.Date2);

    if(this.Date1 > this.Date2)
    {
      //alert("Please Enter valid Timings.");
      jQuery("#startTimeError").css("display", "block");
      jQuery("#endTimeError").css("display", "block");
      // meetings.startHours = "";
      // meetings.startMinutes = "";
      // meetings.startForm = "";
      // meetings.endHours = "";
      // meetings.endMinutes = "";
      // meetings.endForm = "";
      return;
    }
    else
    {
      jQuery("#startTimeError").css("display", "none");
      jQuery("#endTimeError").css("display", "none");
    }
    meeting.startTime = meeting.startHours + ":" + meeting.startMinutes;
    console.log(meeting.startTime);

    meeting.endTime = meeting.endHours + ":" + meeting.endMinutes;
    console.log(meeting.endTime);
    console.log("User ID", this.userId.userId);
  
  }
 
  submitted = false;
  edit_view = 1;
  onSubmit: (meeting) => any
  = function(meeting) {
    console.log("User ID", this.userId.userId);
  this.submitted = true;

    meeting.meeting_attendees = "";
    for(let i = 0 ; i < this.checked.length ; i++){
      if(i ==0 ){
      meeting.meeting_attendees = meeting.meeting_attendees + this.checked[i];
    }
    else
    {
      meeting.meeting_attendees = meeting.meeting_attendees + "," +this.checked[i];
    }
    }
    console.log(meeting.meeting_attendees);


    


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
      attendees: meeting.meeting_attendees,
      startForm : meeting.startForm,
      endForm : meeting.endForm
    }
    this.http.post('http://localhost:8081/postMeeting',[this.userId.userId , JSON.stringify(meetingObj)], { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        document.getElementById("errorId").innerHTML = "Insert successfull";
        //window.alert("Meeting Added!!");
      },
      error => {
        console.log(error.text());
        //window.alert("Please Enter Valid details");
      }
      );
    jQuery("#createsuccess").css("display", "block");

this.router.navigate(['/meetingList']);
  }
  reset: () => any
  = function() {
    this.meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: '', meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '' }];
  }
  
  numarr = [];
  tempattendees : string;
  edit: (meetings) => any
  = function(meetings) {
    // meetings.meeting_attendees = "";
    // for(let i = 0 ; i < this.checked.length ; i++){
    //   if(i ==0 ){
    //   meetings.meeting_attendees = meetings.meeting_attendees + this.checked[i];
    // }
    // else
    // {
    //   meetings.meeting_attendees = meetings.meeting_attendees + "," +this.checked[i];
    // }
    // }
    // console.log(meetings.meeting_attendees);

    //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
    console.log(this.checked);
    var trackIndex = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
      }).get();
    console.log(this.trackindex);
    console.log(meetings.meetingDate);
    this.dateArr =meetings.meetingDate.split("-");
    console.log(this.dateArr[0],this.dateArr[1],this.dateArr[2]);

    console.log(this.dateArr[0],this.dateArr[1],this.dateArr[2],meetings.startHours,meetings.startMinutes);
    this.Date1 = new Date(this.dateArr[0],this.dateArr[1],this.dateArr[2],meetings.startHours,meetings.startMinutes);
    console.log(this.Date1);

    this.Date2 = new Date(this.dateArr[0],this.dateArr[1],this.dateArr[2],meetings.endHours,meetings.endMinutes);
    console.log(this.Date2);

    if(this.Date1 > this.Date2)
    {
      //alert("Please Enter valid Timings.");
      jQuery("#startTimeError").css("display", "block");
      jQuery("#endTimeError").css("display", "block");
      // meetings.startHours = "";
      // meetings.startMinutes = "";
      // meetings.startForm = "";
      // meetings.endHours = "";
      // meetings.endMinutes = "";
      // meetings.endForm = "";
      return;
    }
    else
    {
      jQuery("#startTimeError").css("display", "none");
      jQuery("#endTimeError").css("display", "none");
    }
    meetings.startTime = meetings.startHours + ":" + meetings.startMinutes;
    meetings.endTime = meetings.endHours + ":" + meetings.endMinutes;
   



    // this.attendees.pop();
    // this.attendees.shift();


   // console.log(this.attendees);
  //  this.attendees.pop();
  //  this.attendees.shift();

    console.log(this.attendees);
   
    console.log(this.checked);

    for (let i = 0; i < this.attendees.length; i++) {
      this.checked.push(this.attendees[i]);

   
    }

    //  this.edit_view = 0;
    //  meetings.meeting_attendees = JSON.stringify(this.attendees);
    console.log(this.checked);
    this.tempattendees = "";
    for(let i = 0 ; i < this.checked.length ; i++){
      if(i ==0 ){
      this.tempattendees = this.tempattendees + this.checked[i];
    }
    else
    {
      this.tempattendees = this.tempattendees + "," +this.checked[i];
    }
    }
    console.log(this.tempattendees);


    meetings.meetingAttendees = this.tempattendees
    console.log(meetings.meetingAttendees);
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
      attendees: meetings.meetingAttendees,
      startForm : meetings.startForm,
      endForm : meetings.endForm
    }
    this.http.put('http://localhost:8081/updateMeeting',[this.userId.userId , JSON.stringify(meetingObj)], { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        document.getElementById("errorId").innerHTML = "Update successfull";
      //  window.alert("Meeting Updated!!");
      },
      error => {
        console.log(error.text());
      //  window.alert("Please Enter Valid details");
      }
      );
    jQuery("#editsuccess").css("display", "block");

      this.router.navigate(['/meetingList']);
  }
  ngOnInit() {
    this.meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: this.userName, meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '',startHours :'',startMinutes:'',startForm:'',endHours :'',endMinutes:'', endForm:''}];

  }

  }

