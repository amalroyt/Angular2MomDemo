import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { MeetingListModule } from './meetingList/meetingList.module';
import { MoreDetailsModule } from './moreDetails/moreDetails.module';
import { MeetingModule } from './meeting/meeting.module';
import { DiscussionModule } from './discussion/discussion.module';
import { ActionModule } from './action/action.module';
import { DiscussionComponent } from './discussion/discussion.component';
import { ActionComponent } from './action/action.component';
import { MeetingListComponent } from './meetingList/meetingList.component';
import { routes } from './app.routes';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'dicussion', component: DiscussionComponent },
  { path: 'action', component: ActionComponent },
  { path: 'meetingList', component: MeetingListComponent },

];

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
    DiscussionModule,
    ActionModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
