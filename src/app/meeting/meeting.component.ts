import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { contentHeaders } from '../common/headers';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  types = [];
  facilitator = [];
  recorder = [];
  options =[];
  checked: string[] = [];

  constructor(private http: Http,private router: Router) {

    this.http.get('http://localhost:8081/getTypes', { headers: contentHeaders })
    .subscribe(
    response => {console.log(response.json());
      this.types = response.json();
    },
    error => {
      console.log(error.text());
    }
    );

    this.http.get('http://localhost:8081/getAttendees', { headers: contentHeaders })
    .subscribe(
    response => {console.log(response.json());
      this.options = response.json();
    },
    error => {
      console.log(error.text());
    }
    );

    this.http.get('http://localhost:8081/getFaci', { headers: contentHeaders })
    .subscribe(
    response => {console.log(response.json());
      this.facilitator= response.json();
    },
    error => {
      console.log(error.text());
    }
    );

    this.http.get('http://localhost:8081/getRec', { headers: contentHeaders })
    .subscribe(
    response => {console.log(response.json());
      this.recorder = response.json();
    },
    error => {
      console.log(error.text());
    }
    );
}
updateChecked(option, event) {
    console.log('event.target.value ' + event.target.value);
    var index = this.checked.indexOf(option);
    if(event.target.checked) {
      console.log('add');
      if(index === -1) {
        this.checked.push(option);
      }
    } else {
      console.log('remove');
      if(index !== -1) {
        this.checked.splice(index, 1);
      }
    }
    //this.checked[option]=event.target.value; // or `event.target.value` not sure what this event looks like
    console.log(this.checked);

  }

  meeting = new Meeting('','','','','','','','','','','');
  submitted = false;
  
  onSubmit(meeting) {
  		this.submitted = true;
      //console.log(meeting.meeting_agenda);
    //  console.log(meeting);
      meeting.meeting_attendees = this.checked.join();
      console.log(meeting.meeting_attendees);
      this.http.post('http://localhost:8081/postMeeting', JSON.stringify(meeting), { headers: contentHeaders })
      .subscribe(
      response => {console.log(response.json());
      window.alert("Meeting Added!!");
      },
      error => {
        console.log(error.text());
        window.alert("Please Enter Valid details");
      }
      );



      alert("Saved");
    //  this.reset();
}
  reset(){
      this.meeting = new Meeting('','','','','','','','','','','');
  }

  ngOnInit() {
  }

}
