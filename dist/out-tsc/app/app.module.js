var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { MeetingListModule } from './meetingList/meetingList.module';
import { MoreDetailsModule } from './moreDetails/moreDetails.module';
import { MeetingModule } from './meeting/meeting.module';
import { routes } from './app.routes';
import { ActionDiscussionModule } from './actionDiscussion/actionDiscussion.module';
import { AuthenticationService } from './services/auth.service';
import { SharedService } from './services/sharedDetails.service';
import { AuthGuard } from './guards/auth.guard';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            HomeModule,
            LoginModule,
            MeetingListModule,
            MoreDetailsModule,
            MeetingModule,
            ActionDiscussionModule,
            RouterModule.forRoot(routes)
        ],
        providers: [AuthenticationService, SharedService, AuthGuard],
        bootstrap: [AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
export { AppModule };
var MyModule = (function () {
    function MyModule() {
    }
    return MyModule;
}());
//# sourceMappingURL=../../../src/app/app.module.js.map