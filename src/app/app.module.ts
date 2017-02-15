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

const appRoutes: Routes = [
  { path: '', component:AppComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2DatetimePickerModule,
    HomeModule,
    LoginModule,
    MeetingListModule,
    MoreDetailsModule,
    MeetingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
