import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { ActionDiscussion, Action } from './actionDiscussion';
declare var jQuery: any;

@Component({
  selector: 'app-discussion',
  templateUrl: './actionDiscussion.component.html',
  styleUrls: ['./actionDiscussion.component.css']
})
export class ActionDiscussionComponent implements OnInit {
  public discussionTypes = [];
  public userName = [];
  public statusValue = [];
  public moreDetailsList = [];
  public existingMettingInfoDisc = [];
  public existingMettingInfoAction = [];
  public meetingId;
  public openSinceFirst: String;
  public discussionPublic;
  submitAttempt: boolean = false;
  public myVar;

  constructor(private http: Http, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingId = params['id'];
    });

    this.http.get('http://localhost:8081/getExistingMettingInfo/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.existingMettingInfoDisc = response.json();
        this.discussionPublic = response.json();
        if ((this.existingMettingInfoDisc).length != 0) {
          this.models = this.existingMettingInfoDisc;
        } else {
          this.models;
          //console.log("New Discussion Value");
        }
      },
      error => {
        console.log(error.text());
      });
    this.http.get('http://localhost:8081/getExistingMeetingInfoAction/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.existingMettingInfoAction = response.json();
        if ((this.existingMettingInfoAction).length != 0) {
          this.modelValues = this.existingMettingInfoAction;
          //this.openSinceFirst = new Date().toISOString().slice(0, 10);
        } else {
          //console.log("New Action Value");
        }
      },
      error => {
        console.log(error.text());
      });

    this.http.get('http://localhost:8081/actionDiscussion/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.moreDetailsList = response.json();
      },
      error => {
        console.log(error.text());
      });

    this.http.get('http://localhost:8081/getTypes', { headers: contentHeaders })
      .subscribe(
      response => {
        this.discussionTypes = response.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.http.get('http://localhost:8081/getUserNames/' + this.meetingId, { headers: contentHeaders })
      .subscribe(
      response => {
        this.userName = response.json();
      },
      error => {
        console.log(error.text());
      }
      );

    this.http.get('http://localhost:8081/getStatus', { headers: contentHeaders })
      .subscribe(
      response => {
        this.statusValue = response.json();
      },
      error => {
        console.log(error.text());
      }
      );

    //  jQuery(function() {
    //   jQuery("#openSince").datepicker();
    //   jQuery("#expectedCompletion").datepicker();
    //  });

  }


  loadingFunction: () => any
  = function() {
    this.myVar = setTimeout(this.showPage, 2000);
  }

  showPage: () => any
  = function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loadDiv").style.display = "block";
  }

  ngOnInit() {
    this.loadingFunction();
  };

  models = [{ discussionBy: '', discussionType: '', discussion: '', decisionBy: '', decision: '' }, { discussionBy: '', discussionType: '', discussion: '', decisionBy: '', decision: '' }];
  modelValues = [{ actionDesc: '', responsible: '', openSince: '', expectedCompletion: '', actualCompletion: '', status: '' }, { actionDesc: '', responsible: '', openSince: '', expectedCompletion: '', actualCompletion: '', status: '' }];
  model = new ActionDiscussion('', '', this.userName[0], this.discussionTypes[0], this.userName[0]);
  modelAction = new Action('', new Date(), new Date(), new Date(), this.statusValue[0], this.userName[0]);

  /***********DISCUSSION***********/
  onSubmit: () => any
  = function() {
    for (var i = 0; i < (this.models).length; i++) {
      if ((this.models[i]).discussionBy != "" && (this.models[i]).discussionType != "" && (this.models[i]).discussion != "" && (this.models[i]).decisionBy != "" && (this.models[i]).decision != "") {
        this.http.post('http://localhost:8081/discussionPoints', [this.meetingId, JSON.stringify(this.models[i])], { headers: contentHeaders })
          .subscribe(
          response => {
            //this.router.navigate(['/meetingList']);
          },
          error => {
            console.log(error.text());
          }
          );
      }
      else {
        console.log("Null");
      }
    }

  }
  resetDiscussionForm: () => any
  = function() {
    for (var i = 0; i < (this.models).length; i++) {
      var currentModel = this.models[i];
      if (currentModel.id != undefined) {
        this.http.get('http://localhost:8081/getExistingMettingInfo/' + this.meetingId, { headers: contentHeaders })
          .subscribe(
          response => {
            this.existingMettingInfoDisc = response.json();
            this.discussionPublic = response.json();
            this.models = this.existingMettingInfoDisc;
          },
          error => {
            console.log(error.text());
          });
      } else {
        currentModel.discussionBy =
          currentModel.discussionType =
          currentModel.discussion =
          currentModel.decisionBy =
          currentModel.decision = null;
        console.log(currentModel);
      }
    }
    return false;
  }

  addNewChoice: () => any
  = function() {
    (this.models).push({ discussionBy: '', discussionType: '', discussion: '', decisionBy: '', decision: '' });
  }

  formatDate: (myDate) => any
  = function(myDate) {
    //console.log("myDate", Date.parse(myDate));
    console.log("111111", new Date(myDate));
    return new Date().toISOString().slice(0, 10);
  }

  removeNewChoice: () => any
  = function() {
    var trackIndex = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get().filter(function(item, index) {
      return item !== "";
    });
    var indexValue = jQuery('input:checkbox:checked').parents("tr").map(function() {
      return jQuery(this).index();
    }).get();
    if (indexValue.length != 0) {
      if (trackIndex.length != 0) {
        this.http.delete('http://localhost:8081/deleteDiscussionPoints/' + trackIndex, { headers: contentHeaders })
          .subscribe(
          response => {
            document.getElementById("errorId").innerHTML = "Selected row/s from Discussion Points has/have been deleted";
            this.http.get('http://localhost:8081/getExistingMettingInfo/' + this.meetingId, { headers: contentHeaders })
              .subscribe(
              response => {
                this.existingMettingInfoDisc = response.json();
                this.discussionPublic = response.json();
                this.models = this.existingMettingInfoDisc;
              },
              error => {
                console.log(error.text());
              });
          },
          error => {
            console.log(error.text());
          }
          );
      } else {
        for (var val in indexValue) {
          this.models.splice(indexValue[val], 1);
        }
        jQuery('input:checkbox:checked').parents("tr").remove();
      }
    }
    else {
      document.getElementById("errorId").innerHTML = "Select atleast one row to delete";
    }
  }

  /***********ACTION***********/
  onSubmitAction: () => any
  = function() {
    for (var i = 0; i < (this.modelValues).length; i++) {
      if ((this.modelValues[i]).actionDesc != "" && (this.modelValues[i]).responsible != "" && (this.modelValues[i]).openSince != "" && (this.modelValues[i]).expectedCompletion != "" && (this.modelValues[i]).status != "") {
        this.http.post('http://localhost:8081/actionItems', [this.meetingId, JSON.stringify(this.modelValues[i])], { headers: contentHeaders })
          .subscribe(
          response => {
            //this.router.navigate(['/meetingList']);
          },
          error => {
            console.log(error.text());
          }
          );
      }

      else {
        console.log("Null");
      }
    }
  }

  resetActionForm: () => any
  = function() {
    for (var i = 0; i < (this.modelValues).length; i++) {
      if ((this.modelValues[i]).id != undefined) {
        console.log("id");
        this.http.get('http://localhost:8081/getExistingMeetingInfoAction/' + this.meetingId, { headers: contentHeaders })
          .subscribe(
          response => {
            this.existingMettingInfoAction = response.json();
            this.modelValues = this.existingMettingInfoAction;
          },
          error => {
            console.log(error.text());
          });
      } else {
        (this.modelValues[i]).actionDesc = "";
        (this.modelValues[i]).responsible = "";
        (this.modelValues[i]).openSince = "";
        (this.modelValues[i]).expectedCompletion = "";
        (this.modelValues[i]).status = "";
      }
    }
  }

  addNewRow: () => any
  = function() {
    (this.modelValues).push({ actionDesc: '', responsible: '', openSince: '', expectedCompletion: '', actualCompletion: '', status: '' });
    // console.log((this.modelValues).length );
    // for ( var i = 2 ; i <= (this.modelValues).length ; i++ ) {
    //   console.log("Inside loop");
    // jQuery( "#openSince" + i ).datepicker();
    // }
  }


  removeNewRow: () => any
  = function() {
    var trackIndex = jQuery('input:checkbox:checked').map(function() {
      return jQuery(this).val();
    }).get().filter(function(item, index) {
      return item !== "";
    });
    var indexValue = jQuery('input:checkbox:checked').parents("tr").map(function() {
      return jQuery(this).index();
    }).get();
    if (indexValue.length != 0) {
      if (trackIndex.length != 0) {
        this.http.delete('http://localhost:8081/deleteActionItem/' + trackIndex, { headers: contentHeaders })
          .subscribe(
          response => {
            document.getElementById("errorId").innerHTML = "Selected row/s from Action Items has/have been deleted";
            this.http.get('http://localhost:8081/getExistingMeetingInfoAction/' + this.meetingId, { headers: contentHeaders })
              .subscribe(
              response => {
                this.existingMettingInfoAction = response.json();
                this.modelValues = this.existingMettingInfoAction;
              },
              error => {
                console.log(error.text());
              });
          },
          error => {
            console.log(error.text());
          }
          );
      } else {
        for (var val in indexValue) {
          this.models.splice(indexValue[val], 1);
        }
        jQuery('input:checkbox:checked').parents("tr").remove();
      }
    }
    else {
      document.getElementById("errorId").innerHTML = "Select atleast one row to delete";
    }
  }
}
