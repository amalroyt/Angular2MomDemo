import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
//import {LoginComponent} from './login/login.component';
//import * as moment from 'moment';
declare var jQuery: any;
//declare var moment: any;
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  meetingInfo = [];
  public time = {
    hours: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    minutes: ["00", "15", "30", "45"],
    form: ["AM", "PM"]
  };
  public duration = ["30", "01", "02", "03", "04", "05", "06", "07", "08"];
  public userId = this.authService.getUserdetails();
  userName = this.userId.firstName + " " + this.userId.lastName;
  public meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: this.userName, meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '', startHours: '', startMinutes: '', startForm: '', endHours: '', endMinutes: '', endForm: '' }];
  public attendees = [];
  types = [];
  facilitator = [];
  recorder = [];
  public options = [];
  firstlast = [];
  public checked: string[] = [];
  public meeting_id: any;
  timeArr = [];
  endtimeArr = [];
  unchecked = [];
  result = [];
  public startHours: any;
  public startMinutes: any;
  public startForm: any;
  public cancelMeet: boolean;
  checkAllValues = [];
  public counts = [];
  public csv : any;
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {
   jQuery("#editsuccess").css("display", "none");
    jQuery("#createsuccess").css("display", "none");
    this.cancelMeet = false;
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
    if ((this.meeting_id) != undefined) {
      this.http.get('http://localhost:8081/getMeetingInfo/' + this.meeting_id, { headers: contentHeaders })
        .subscribe(
        response => {
          this.meetingInfo = response.json();
          if ((this.meetingInfo).length != 0) {
            this.meetings = this.meetingInfo[0];
            this.meetings[0] = this.meetingInfo[0];

            this.timeArr = (this.meetings[0].startTime).split(":");
            this.meetings[0].startHours = this.timeArr[0];
            this.meetings[0].startMinutes = this.timeArr[1];

            this.timeArr = (this.meetings[0].endTime).split(":");
            this.meetings[0].endTime = this.timeArr[0] + ":" + this.timeArr[1] + " " + this.meetings[0].endForm;


          } else {
            console.log("New Meeting Value");
          }
          console.log(this.meetings[0].meetingAttendees);
          this.result = this.meetings[0].meetingAttendees.split(",");
          console.log(this.result);
          this.attendees = this.result;
          console.log(this.attendees);
          for (let i = 0; i < this.options.length; i++) {
            console.log(this.options[i].id);
            for (let j = 0; j < this.attendees.length; j++) {
              if (this.options[i].id == this.attendees[j]) {
                jQuery("#" + this.attendees[j]).prop("checked", true);
              }
            }
          }
        },
        error => {
          console.log(error.text());
        }
        );
    }
    this.http.get('http://localhost:8081/getFaci', { headers: contentHeaders })
      .subscribe(
      response => {
        this.facilitator = response.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.http.get('http://localhost:8081/getRec', { headers: contentHeaders })
      .subscribe(
      response => {
        this.recorder = response.json();
      },
      error => {
        console.log(error.text());
      }
      );


    if ((this.meeting_id) != undefined) {
      this.http.get('http://localhost:8081/checkIfAllItemsClosed/' + this.meeting_id, { headers: contentHeaders })
        .subscribe(
        response => {
          this.checkAllValues = response.json();
          for (var i = 0; i < this.checkAllValues.length; i++) {
            if (this.checkAllValues[i].status != 2) {

              jQuery("input[type=radio][value=" + 2 + "]").prop("disabled",true);
              jQuery("input[type=radio][value=" + 5 + "]").prop("disabled",true);
              document.getElementById('openStatus').innerHTML = "Can't close or cancel the meeting status as all action items are closed";

            }
          }
        },
        error => {
          console.log(error.text());
        });
    }

    this.http.get('http://localhost:8081/generateheatmap', { headers: contentHeaders })
      .subscribe(
      response => {
        //console.log(response.json());
        this.counts = response.json();

      },
      error => {
        console.log(error.text());
      }
      );

}

  updateChecked: (option, event) => any
  = function(option, event) {
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
    var indexValue = jQuery('input:checkbox:not(:checked)').map(function() {
      return jQuery(this)[0].id;
    }).get();
    var abc = indexValue.map(Number);
    for (var i in abc) {
      for (var j in this.attendees) {
        if (this.attendees[j] == abc[i]) {
          console.log(abc[i]);
          this.attendees.splice(this.attendees.indexOf(abc[i]), 1);
        }
      }
    }
    console.log(this.attendees);
  }
  checkAll: () => any
  = function() {
    console.log(this.options);
    jQuery(document).on('click', '#check', function(event) {
      if (!event.isPropagationStopped()) {
        event.stopPropagation();
        if ((jQuery(this).val()) == 'Check All Rows') {
          jQuery('.checkAllCheckbox').prop('checked', true);
          jQuery(this).val('Uncheck All Rows');
        } else {
          jQuery('.checkAllCheckbox').prop('checked', false);
          jQuery(this).val('Check All Rows');
        }
      }
    });
  };

  onChangeSHours: (hours) => any
  = function(hours) {
    this.startHours = hours;

  };
  onChangeSMins: (mins) => any
  = function(mins) {
    this.startMinutes = mins;

  };
  onChangeSForm: (form) => any
  = function(form) {
    this.startForm = form;
    this.meetings.startForm = form;
  };
  onChangeDuration: (dur) => any
  = function(dur) {
    var duration = dur;
    var endTime: any;
    var endForm;

    function timeToMins(time) {
      var b = time.split(':');
      return b[0] * 60 + +b[1];
    }
    function timeFromMins(mins) {
      var x = mins / 60;
      if (x >= 12 && x < 24) {

        endForm = "PM";
      }
      else {
        endForm = "AM"
      }
      function z(n) { return (n < 10 ? '0' : '') + n; }
      var h = (mins / 60 | 0) % 24;
      if (h > 12) { h = h - 12; }
      if (h == 0) { h = 12; }
      var m = mins % 60;
      return z(h) + ':' + z(m) + " " + endForm;
    }
    function addTimes(t0, t1) {
      return timeFromMins(timeToMins(t0) + timeToMins(t1));
    }
    if (this.meeting_id != undefined) {
      this.startHours = this.meetings[0].startHours;
    }
    if (this.meeting_id != undefined) {
      this.startMinutes = this.meetings[0].startMinutes;
    }
    if (this.meeting_id != undefined) {
      this.startForm = this.meetings[0].startForm;
    }
    if (this.startForm == 'PM') {
      this.startHours = parseInt(this.startHours) + 12;
    }
    if (this.startHours == 12) {
      this.startHours = 0;
    }
    var startTime = this.startHours.toString() + ":" + this.startMinutes;
    if (duration == 30) {
      endTime = addTimes(startTime, '00:30');
    }
    else {
      endTime = addTimes(startTime, duration + ':00');
    }
    if (this.startForm == 'PM') {
      this.startHours = parseInt(this.startHours) - 12;
    }
    startTime = this.startHours.toString() + ":" + this.startMinutes;
    this.meetings.startTime = startTime;
    this.meetings.endForm = endForm;
    this.meetings.endTime = endTime;
  };
  sample = [];
  submitted = false;
  edit_view = 1;
  dateArr = [];
  Date1 = new Date();
  Date2 = new Date();
  date1: string;
  date2: string;
  stringArray: string;
  cleanedString: string;
  onSubmit: (meeting) => any
  = function(meeting) {
    if (!meeting.meetingStatus) {
      meeting.meetingStatus = 1;
    }
    var attendeesId = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get();
    if (attendeesId.length != 0) {
      console.log(JSON.stringify({ attendees: attendeesId }));
      meeting.meeting_attendees = attendeesId;
    }
    console.log(meeting.meeting_attendees);
    console.log(meeting);
    console.log(meeting.endTime);
    var et = meeting.endTime.split(" ");
    console.log(et[0]);
    var meetingObj = {
      id: this.meeting_id,
      status: meeting.meetingStatus,
      type: meeting.meetingType,
      title: meeting.meetingTitle,
      purpose: meeting.meetingPurpose,
      facilitator: meeting.meetingFacilitator,
      recorder: meeting.meetingRecorder,
      venue: meeting.meetingVenue,
      date: meeting.meetingDate,
      startTime: meeting.startTime,
      endTime: et[0],
      agenda: meeting.meetingAgenda,
      attendees: meeting.meeting_attendees,
      startForm: meeting.startForm,
      endForm: meeting.endForm,
      duration: meeting.duration,
      reason: meeting.meetingReason
    }
    if (this.meeting_id == undefined) {
      this.http.post('http://localhost:8081/postMeeting', [this.userId.userId, JSON.stringify(meetingObj)], { headers: contentHeaders })
        .subscribe(
        response => {
          this.router.navigate(['/meetingList']);
        },
        error => {
          console.log(error.text());
        }
        );
        document.getElementById('successId').innerHTML = "Meeting Created Successfully!!";
        setTimeout(function() {
         document.getElementById("successId").innerHTML = ""; }, 5000);
    }
    else {
      this.http.put('http://localhost:8081/updateMeeting', [this.userId.userId, JSON.stringify(meetingObj)], { headers: contentHeaders })
        .subscribe(
        response => {
          console.log(response.json());
        },
        error => {
          console.log(error.text());
        }
        );
        document.getElementById('successId').innerHTML = "Meeting Updated Successfully!!";
        setTimeout(function() {
         document.getElementById("successId").innerHTML = ""; }, 5000);
      this.router.navigate(['/meetingList']);
    }
  }
  reset: () => any
  = function() {
    this.meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: '', meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '' }];
  }
  reason: () => any
  = function() {
    this.cancelMeet = true;
  }
  reasonclose: () => any
  = function() {
    this.cancelMeet = false;
  }
  ngOnInit() {
  }
}
