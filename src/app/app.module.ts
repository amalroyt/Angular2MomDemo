import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MoreDetailsComponent } from './moreDetails/moreDetails.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingListComponent } from './meetingList/meetingList.component';
import { routes } from './app.routes';
import { ActionDiscussionComponent } from './actionDiscussion/actionDiscussion.component';
import { AuthenticationService } from './services/auth.service';
import { SharedService } from './services/sharedDetails.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ErrorPageModule } from './errorPage/errorPage.module';
import { QuarterMeetingsComponent } from './quarterMeetings/quarterMeetings.component';
import { GoogleAnalyticsEventsService } from "./services/google-analytics-events.service";
import { CreateUserComponent } from './createUser/createUser.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { AlertComponent } from './common/alert/alert.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    MeetingListComponent,
    MoreDetailsComponent,
    MeetingComponent,
    ActionDiscussionComponent,
    NavigationComponent,
    AlertComponent,
    HeaderComponent,
    QuarterMeetingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ErrorPageModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, SharedService, AuthGuard, GoogleAnalyticsEventsService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
class MyModule { }
