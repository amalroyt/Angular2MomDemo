import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { ActionDiscussion, Action } from './actionDiscussion';
declare var jQuery: any;
import { AuthenticationService } from '../services/auth.service';

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
  public actionPublic;
  public discussionCounter = 0;
  public actionCounter = 0;
  public userId = this.authService.getUserdetails();

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {
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
        this.actionPublic = response.json();
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
    document.getElementById("footerDisp").style.display = "none";
    this.myVar = setTimeout(this.showPage, 2000);
  }

  showPage: () => any
  = function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loadDiv").style.display = "block";
    document.getElementById("footerDisp").style.display = "block";
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
    console.log(this.models);
    //To check if any discussion data is present for that particular meeting.
    if (this.discussionPublic.length != 0) {
      for (var val in this.models) {
        //To check if that particular discussion points row is empty.
        if (this.discussionPublic[val] != undefined) {
          //To check if data for that particular discussion points row is modified or not.
          if (this.discussionPublic[val].decision === this.models[val].decision && this.discussionPublic[val].decisionBy === this.models[val].decisionBy && this.discussionPublic[val].discussion === this.models[val].discussion && this.discussionPublic[val].discussionBy === this.models[val].discussionBy && this.discussionPublic[val].discussionType === this.models[val].discussionType) {
            this.discussionCounter++;
          }
          else {
            var discussionId = this.discussionPublic[val].id;
            //To update that particular discussion points row.
            this.http.post('http://localhost:8081/updateDiscussion/' + discussionId, [this.userId.userId, JSON.stringify(this.models[val])], { headers: contentHeaders })
              .subscribe(
              response => { },
              error => {
                console.log(error.text());
              });
          }
        }
        else {
          //To insert a new row for that discussion point.
          this.http.post('http://localhost:8081/discussionPoints', [this.meetingId, JSON.stringify(this.models[val])], { headers: contentHeaders })
            .subscribe(
            response => {
              document.getElementById("errorId").innerHTML = "Insert successfull";
            },
            error => {
              console.log(error.text());
            });
        }
      }
    }
    else {
      for (var val in this.models) {
        //To check if any discussion data is present for that particular meeting if not then insert a new row for that discussion point.
        if ((this.models[val]).discussionBy != "" && (this.models[val]).discussionType != "" && (this.models[val]).discussion != "" && (this.models[val]).decisionBy != "" && (this.models[val]).decision != "") {
          this.http.post('http://localhost:8081/discussionPoints', [this.meetingId, JSON.stringify(this.models[val])], { headers: contentHeaders })
            .subscribe(
            response => {
              document.getElementById("errorId").innerHTML = "Insert successfull";
            },
            error => {
              console.log(error.text());
            });
        }
        else {
          document.getElementById("errorId").innerHTML = "Rows should be filled completely";
        }
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
    //To check if any action data is present for that particular meeting.
    if (this.actionPublic.length != 0) {
      for (var val in this.modelValues) {
        //To check if that particular action points row is empty.
        if (this.actionPublic[val] != undefined) {
          //To check if data for that particular action points row is modified or not.
          if (this.actionPublic[val].actionDesc === this.modelValues[val].actionDesc && this.actionPublic[val].responsible === this.modelValues[val].responsible && this.actionPublic[val].openSince === this.modelValues[val].openSince && this.actionPublic[val].expectedCompletion === this.modelValues[val].expectedCompletion && this.actionPublic[val].actualCompletion === this.modelValues[val].actualCompletion && this.actionPublic[val].status === this.modelValues[val].status)
          {
            this.actionCounter++;
            if (this.actionCounter === this.actionPublic.length && this.discussionCounter === this.discussionPublic.length) {
              document.getElementById("errorId").innerHTML = "Discussion points & Action points are already up-to-date";
            }
            else
              if (this.actionCounter === this.actionPublic.length && this.discussionCounter != this.discussionPublic.length) {
                document.getElementById("errorId").innerHTML = "Discussion points updated & Action points already up-to-date";
              }
              else
                if (this.actionCounter != this.actionPublic.length && this.discussionCounter === this.discussionPublic.length) {
                  document.getElementById("errorId").innerHTML = "Discussion points already up-to-date & Action points updated";
                }
          }
          else {
            var actionId = this.actionPublic[val].id;
            //To update that particular action points row.
            this.http.post('http://localhost:8081/updateAction/' + actionId, [this.userId.userId, JSON.stringify(this.modelValues[val])], { headers: contentHeaders })
              .subscribe(
              response => { },
              error => {
                console.log(error.text());
              });
          }
        }
        else {
          //To insert a new row for that action point.
          this.http.post('http://localhost:8081/actionItems', [this.meetingId, JSON.stringify(this.modelValues[val])], { headers: contentHeaders })
            .subscribe(
            response => {
              document.getElementById("errorId").innerHTML = "Insert successfull";
            },
            error => {
              console.log(error.text());
            });
        }
      }
    } else {
      for (var val in this.modelValues) {
        //To check if any action data is present for that particular meeting if not then insert a new row for that action point.
        if ((this.modelValues[val]).actionDesc != "" && (this.modelValues[val]).responsible != "" && (this.modelValues[val]).openSince != "" && (this.modelValues[val]).expectedCompletion != "" && (this.modelValues[val]).status != "") {
          this.http.post('http://localhost:8081/actionItems', [this.meetingId, JSON.stringify(this.modelValues[val])], { headers: contentHeaders })
            .subscribe(
            response => {
              document.getElementById("errorId").innerHTML = "Insert successfull";
            },
            error => {
              console.log(error.text());
            });
        } else {
          document.getElementById("errorId").innerHTML = "Rows should be filled completely";
        }
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