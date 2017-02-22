import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Action } from './action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  public meetingIds = [];
  public userName = [];
  public statusValue = [];
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
    this.http.get('http://localhost:8081/getStatus', { headers: contentHeaders })
      .subscribe(
      response => {
        console.log("response");
        this.statusValue = response.json();
      },
      error => {
        console.log(error.text());
      }
      );
  }

  ngOnInit() {
  };
  model = new Action('', new Date(), new Date(), new Date(), this.meetingIds[0], this.statusValue[0], this.userName[0]);
  models = [{ actionDesc: 'actionDesc1', responsible: 'responsible1', openSince: 'openSince1', expectedCompletion: 'expectedCompletion1', actualCompletion: 'actualCompletion1', status: 'status1' }, { actionDesc: 'actionDesc2', responsible: 'responsible2', openSince: 'openSince2', expectedCompletion: 'expectedCompletion2', actualCompletion: 'actualCompletion2', status: 'status2' }];
  //models =[{actionDesc: '', responsible: '', openSince: '', expectedCompletion: '', actualCompletion: '', status: '' },{actionDesc: '', responsible: '', openSince: '', expectedCompletion: '', actualCompletion: '', status: ''}];

  onSubmit: (id: number) => any
  = function(id: number) {
    console.log(id);
    this.models.push({ ids: id });
    console.log(this.models);
    this.http.post('http://localhost:8081/action', JSON.stringify(this.models), { headers: contentHeaders })
      .subscribe(
      response => {
        this.router.navigate(['/meetingList']);
      },
      error => {
        console.log(error.text());
      }
      );
  }

  addNewChoice: () => any
  = function() {
    var newItemNo = (this.models).length + 1;
    (this.models).push({ 'actionDesc': 'actionDesc' + newItemNo, 'responsible': 'responsible' + newItemNo, 'openSince': 'openSince' + newItemNo, 'expectedCompletion': 'expectedCompletion' + newItemNo, 'actualCompletion': 'actualCompletion' + newItemNo, 'status': 'status' + newItemNo });
    //(this.models).push({actionDesc: '', responsible: '', openSince: '', expectedCompletion: '', actualCompletion: '', status: '' });
  }
  removeNewChoice: () => any
  = function() {
    var newItemNo = (this.models).length - 1;
    if (newItemNo !== 0) {
      (this.models).pop();
    }
  }
}
