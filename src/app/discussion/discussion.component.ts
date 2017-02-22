import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Discussion } from './discussion';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  public discussionTypes = [];
  public userName = [];
  public meetingIds = [];
  constructor(private http: Http, private router: Router) {
    this.http.get('http://localhost:8081/getMeetingId', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log("response");
        this.meetingIds = response.json();

      },
      error => {
        console.log(error.text());
      }
      );
    this.http.get('http://localhost:8081/getTypes', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log("response");
        this.discussionTypes = response.json();

      },
      error => {
        console.log(error.text());
      }
      );

    this.http.get('http://localhost:8081/getUserNames', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log("response");
        this.userName = response.json();

      },
      error => {
        console.log(error.text());
      }
      );
  }
  ngOnInit() {
  };
  models = [{ discussionBy: 'discussionBy1', discussionType: 'discussionType1', discussion: 'discussion1', decisionBy: 'decisionBy1', decision: 'decision1' }, { discussionBy: 'discussionBy2', discussionType: 'discussionType2', discussion: 'discussion2', decisionBy: 'decisionBy2', decision: 'decision2' }];
  //models = [{ discussionBy: '', discussionType: '', discussion: '', decisionBy: '', decision: '' }, {discussionBy: '', discussionType: '', discussion: '', decisionBy: '', decision: '' }];

  model = new Discussion('', '', this.meetingIds[0], this.userName[0], this.discussionTypes[0], this.userName[0]);

  onSubmit: (id: number) => any
  = function(id: number) {
    console.log(id);
    this.models.push({ ids: id });
    console.log(this.models);
    this.http.post('http://localhost:8081/discussion', JSON.stringify(this.models), { headers: contentHeaders })
      .subscribe(
      response => {
        this.router.navigate(['/action']);
      },
      error => {
        console.log(error.text());
      }
      );
  }
  addNewChoice: () => any
  = function() {
    var newItemNo = (this.models).length + 1;
    (this.models).push({ 'discussionBy': 'discussionBy' + newItemNo, 'discussionType': 'discussionType' + newItemNo, 'discussion': 'discussion' + newItemNo, 'decisionBy': 'decisionBy' + newItemNo, 'decision': 'decision' + newItemNo });
    //(this.models).push({ discussionBy: '', discussionType: '', discussion: '', decisionBy: '', decision: '' });
  }
  removeNewChoice: () => any
  = function() {
    var newItemNo = (this.models).length - 1;
    if (newItemNo !== 0) {
      (this.models).pop();
    }
  }
}
