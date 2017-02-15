/*
  Login feature Module
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from '.';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

const meetingRoutes: Routes = [
  { path: 'meeting', component: MeetingComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(meetingRoutes)
  ],
  declarations: [
    MeetingComponent
  ]
})
export class MeetingModule { }
