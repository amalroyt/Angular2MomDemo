import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Action } from './action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  ngOnInit() {
  };
  responsibles = ['Sandeep Nabar', 'Prasanth Soman', 'Vikas Jadhav',
    'Saju Sasidharan', 'Durgesh Ahire', 'Ravi Dadhaniya'];
  statusValue = ['Open', 'Closed'];
  model = new Action('', '', new Date(), new Date(), new Date(), this.statusValue[0], this.responsibles[0]);

  submitted = false;

  onSubmit() {
  this.submitted = true;
    alert("true");
  }

  constructor() { }

}
