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
    hours: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    minutes: ["00", "15", "30", "45"],
    form: ["AM", "PM"]
  };
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
  accounts = [];
  SelectedValue: any = null;
  checkValue = [];
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {


    this.accounts = [{ 'id': 1, 'name': 'Pardeep' }, { 'id': 2, 'name': 'Jain' }, { 'id': 3, 'name': 'Angular2' }];
    jQuery("#editsuccess").css("display", "none");
    jQuery("#createsuccess").css("display", "none");
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

          this.endtimeArr = (this.meetings[0].endTime).split(":");
          this.meetings[0].endHours = this.endtimeArr[0];
          this.meetings[0].endMinutes = this.endtimeArr[1];

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
        this.checkValue = response.json();
        for (var i = 0; i < this.checkValue.length; i++) {
          if (this.checkValue[i].status == 1 || this.checkValue[i].status == 3 || this.checkValue[i].status == 4) {
            jQuery("#closed").prop("disabled", true);
            document.getElementById("errorId").innerHTML = "As all Action Items are not marked as closed, you can not close the meeting Status";
          }
        }
      },
      error => {
        console.log(error.text());
      }
      );
}
document.getElementById("errorId").innerHTML = "";
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
  sample = [];
  submitted = false;
  edit_view = 1;
  dateArr = [];
  Date1 = new Date();
  Date2 = new Date();
  onSubmit: (meeting) => any
  = function(meeting) {
    if (!meeting.meetingStatus) {
      meeting.meetingStatus = 1;
    }
    console.log(meeting.meetingDate);
    this.dateArr = meeting.meetingDate.split("-");
    console.log(this.dateArr[0], this.dateArr[1], this.dateArr[2]);

    this.Date1 = new Date(this.dateArr[0], this.dateArr[1], this.dateArr[2], meeting.startHours, meeting.startMinutes);
    console.log(this.Date1);

    this.Date2 = new Date(this.dateArr[0], this.dateArr[1], this.dateArr[2], meeting.endHours, meeting.endMinutes);
    console.log(this.Date2);

    if (this.Date1 > this.Date2) {

      jQuery("#startTimeError").css("display", "block");
      jQuery("#endTimeError").css("display", "block");
      return;
    }
    else {
      jQuery("#startTimeError").css("display", "none");
      jQuery("#endTimeError").css("display", "none");
    }
    meeting.startTime = meeting.startHours + ":" + meeting.startMinutes;
    console.log(meeting.startTime);
    meeting.endTime = meeting.endHours + ":" + meeting.endMinutes;
    console.log(meeting.endTime);
    this.submitted = true;
    meeting.meeting_attendees = "";
    for (let i = 0; i < this.checked.length; i++) {
      if (i == 0) {
        meeting.meeting_attendees = meeting.meeting_attendees + this.checked[i];
      }
      else {
        meeting.meeting_attendees = meeting.meeting_attendees + "," + this.checked[i];
      }
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
      startForm: meeting.startForm,
      endForm: meeting.endForm
    }
    this.http.post('http://localhost:8081/postMeeting', [this.userId.userId, JSON.stringify(meetingObj)], { headers: contentHeaders })
      .subscribe(
      response => {
        document.getElementById("errorId").innerHTML = "Insert successfull";
        this.router.navigate(['/meetingList']);
      },
      error => {
        console.log(error.text());
      }
      );
    jQuery("#createsuccess").css("display", "block");
  }
  reset: () => any
  = function() {
    this.meetings = [{ meetingId: '', meetingType: '', meetingStatus: '', meetingTitle: '', meetingPurpose: '', meetingFacilitator: '', meetingRecorder: '', meetingVenue: '', meetingDate: '', startTime: '', endTime: '', meetingAgenda: '', meetingAttendees: '' }];
  }
  numarr = [];
  tempattendees: string;
  edit: (meetings) => any
  = function(meetings) {
    var trackIndex = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get();
    console.log(this.trackindex);

    console.log(meetings.meetingDate);
    this.dateArr = meetings.meetingDate.split("-");
    console.log(this.dateArr[0], this.dateArr[1], this.dateArr[2]);

    this.Date1 = new Date(this.dateArr[0], this.dateArr[1], this.dateArr[2], meetings.startHours, meetings.startMinutes);
    console.log(this.Date1);

    this.Date2 = new Date(this.dateArr[0], this.dateArr[1], this.dateArr[2], meetings.endHours, meetings.endMinutes);
    console.log(this.Date2);

    if (this.Date1 > this.Date2) {
      jQuery("#startTimeError").css("display", "block");
      jQuery("#endTimeError").css("display", "block");
      return;
    }
    else {
      jQuery("#startTimeError").css("display", "none");
      jQuery("#endTimeError").css("display", "none");
    }
    meetings.startTime = meetings.startHours + ":" + meetings.startMinutes;
    meetings.endTime = meetings.endHours + ":" + meetings.endMinutes;
    console.log(this.attendees);
    console.log(this.checked);
    for (let i = 0; i < this.attendees.length; i++) {
      this.checked.push(this.attendees[i]);
    }
    console.log(this.checked);
    this.tempattendees = "";
    for (let i = 0; i < this.checked.length; i++) {
      if (i == 0) {
        this.tempattendees = this.tempattendees + this.checked[i];
      }
      else {
        this.tempattendees = this.tempattendees + "," + this.checked[i];
      }
    }
    var attendeesId = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get();
    if (attendeesId.length != 0) {
      console.log(JSON.stringify({ attendees: attendeesId }));
      meetings.meeting_attendees = attendeesId;
    }
    console.log(this.tempattendees);
    meetings.meetingAttendees = this.tempattendees

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
      startForm: meetings.startForm,
      endForm: meetings.endForm
    }
    this.http.put('http://localhost:8081/updateMeeting', [this.userId.userId, JSON.stringify(meetingObj)], { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        console.log(error.text());
      }
      );
    jQuery("#editsuccess").css("display", "block");
    document.getElementById("errorId").innerHTML = "Update successfull";
    this.router.navigate(['/meetingList']);
  }
  ngOnInit() {
    // jQuery("#myForm").get(0).reset();
    // jQuery("#myForm").trigger("reset");
  }
}
