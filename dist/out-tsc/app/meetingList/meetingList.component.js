var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
var MeetingListComponent = (function () {
    function MeetingListComponent(http, router, authService) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.authService = authService;
        this.userId = this.authService.getUserdetails();
        this.edit = function (id) {
            console.log(id);
            this.router.navigate(['/meeting', id]);
        };
        this.openActionDiscussionForm = function (id) {
            this.router.navigate(['/actionDiscussion', id]);
        };
        this.moreDetails = function (id) {
            this.router.navigate(['/moreDetails', id]);
        };
        this.generateExcel = function (meetingId) {
            var _this = this;
            this.http.post('http://localhost:8081/generateExcel/' + meetingId, { headers: contentHeaders })
                .subscribe(function (response) {
                _this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
                    .subscribe(function (response) {
                    _this.meetingList = response.json();
                    document.getElementById("errorId").innerHTML = "Excel generated successfully.";
                }, function (error) {
                    console.log(error.text());
                });
            }, function (error) {
                console.log(error.text());
            });
        };
        this.downloadExcel = function (meetingId) {
            this.http.get('http://localhost:8081/download/' + meetingId, { headers: contentHeaders })
                .subscribe(function (response) {
                window.location.href = "http://localhost:8081/download/" + meetingId;
                document.getElementById("errorId").innerHTML = "Download successfull.";
            }, function (error) {
                console.log(error.text());
            });
        };
        this.toDelete = function () {
            var _this = this;
            var userId = this.userId.userId;
            var meetingIds = jQuery('input:checkbox:checked').map(function () {
                return jQuery(this).val();
            }).get();
            if (meetingIds.length != 0) {
                console.log(JSON.stringify({ meetingIds: meetingIds }));
                this.http.put('http://localhost:8081/deleteMeeting/' + userId, JSON.stringify({ meetingIds: meetingIds }), { headers: contentHeaders })
                    .subscribe(function (response) {
                    _this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
                        .subscribe(function (response) {
                        _this.meetingList = response.json();
                        document.getElementById("errorId").innerHTML = "Selected meetings deleted successfully.";
                    }, function (error) {
                        console.log(error.text());
                    });
                }, function (error) {
                    console.log(error.text());
                });
            }
            else {
                document.getElementById("errorId").innerHTML = "Selected atleast a meeting to delete.";
            }
        };
        this.checkAll = function () {
            jQuery(document).on('click', '#check', function (event) {
                if (!event.isPropagationStopped()) {
                    event.stopPropagation();
                    if ((jQuery(this).val()) == 'Check All Rows') {
                        jQuery('.deleteCheckbox').prop('checked', true);
                        jQuery(this).val('Uncheck All Rows');
                    }
                    else {
                        jQuery('.deleteCheckbox').prop('checked', false);
                        jQuery(this).val('Check All Rows');
                    }
                }
            });
        };
        this.http.get('http://localhost:8081/meetingList', { headers: contentHeaders })
            .subscribe(function (response) {
            _this.meetingList = response.json();
        }, function (error) {
            console.log(error.text());
        });
    }
    return MeetingListComponent;
}());
MeetingListComponent = __decorate([
    Component({
        selector: 'app-meetingList',
        templateUrl: './meetingList.component.html',
        styleUrls: ['./meetingList.component.css'],
        providers: []
    }),
    __metadata("design:paramtypes", [Http, Router, AuthenticationService])
], MeetingListComponent);
export { MeetingListComponent };
//# sourceMappingURL=../../../../src/app/meetingList/meetingList.component.js.map