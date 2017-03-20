import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
//import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { MeetingListModule } from './meetingList/meetingList.module';
import { MoreDetailsModule } from './moreDetails/moreDetails.module';
import { MeetingModule } from './meeting/meeting.module';
import { MeetingListComponent } from './meetingList/meetingList.component';
import { routes } from './app.routes';
import { ActionDiscussionModule } from './actionDiscussion/actionDiscussion.module';
import { ActionDiscussionComponent } from './actionDiscussion/actionDiscussion.component';
// import { LoadingAnimateModule, LoadingAnimateService } from 'ng2-loading-animate';
import { AuthenticationService } from './services/auth.service';
import { SharedService } from './services/sharedDetails.service';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
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
  providers: [AuthenticationService,SharedService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
class MyModule { }
