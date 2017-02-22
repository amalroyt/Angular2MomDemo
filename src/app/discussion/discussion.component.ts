import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Discussion } from './discussion';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  ngOnInit() {
  };
  decisions = ['Sandeep Nabar', 'Prasanth Soman', 'Vikas Jadhav',
    'Saju Sasidharan', 'Durgesh Ahire', 'Ravi Dadhaniya'];
  discussions = ['Sandeep Nabar', 'Prasanth Soman', 'Vikas Jadhav',
    'Saju Sasidharan', 'Durgesh Ahire', 'Ravi Dadhaniya'];
  discussionTypes = ['Descussion', 'Query', 'Demo', 'Other'];

  model = new Discussion('', '', '', this.discussions[0], this.discussionTypes[0], this.decisions[0]);

  submitted = false;

  onSubmit() {
  this.submitted = true;
    alert("true");
  }
  // showFormControls(form: any) {
  //     return form && form.controls['name'] &&
  //     form.controls['name'].value;
  //   }
  constructor() { }

}
