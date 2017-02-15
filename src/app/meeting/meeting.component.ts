import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  types = ['Stand Up','Client Call','Sprint Meet','Other'];
  facilitator = ['Sandeep Nabar','Vikas Jadhav','Saju Sasidharan','Pravin Katta','Ravikumar Dandhaniya','Durgesh Ahire','Pranav Kishore','Sagar Gaikwad','Anjali Walke','Rupesh Ramteke'];

  meeting = new Meeting('Meeting123',this.types[0],'Open','Domo Meeting Stand up','Daily Sprint Meet','Vikas Jadhav','Sagar Gaikwad','CT1-6294','2/10/2017','11.30am','12.15pm','Durgesh Ahire,Pranav Kishore,Rupesh Ramteke,Sagar Gaikwad','• General Engineering updates • JIRA User Stories Status');
  submitted = false;
  onSubmit() {
  		this.submitted = true;
      alert("Saved");
      this.reset();
}
  reset(){
      this.meeting = new Meeting('','','','','','','','','','','','','');
  }

  ngOnInit() {
  }

}
