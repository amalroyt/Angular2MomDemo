// Import our dependencies
import { Routes, ROUTER_CONFIGURATION } from '@angular/router';
import { LoginComponent } from './login';
import { ErrorPageComponent } from './errorPage';
import { MeetingComponent } from './meeting';
import { MeetingListComponent } from './meetingList';
import { MoreDetailsComponent } from './moreDetails';
import { ActionDiscussionComponent } from './actionDiscussion/actionDiscussion.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CanActivate } from '@angular/router';
import { QuarterMeetingsComponent } from './quarterMeetings';
import { CreateUserComponent } from './createUser';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 'heatmap', component: QuarterMeetingsComponent },
  { path: 'meeting', component: MeetingComponent, canActivate: [AuthGuard] },
  { path: 'meeting/:id', component: MeetingComponent, canActivate: [AuthGuard] },
  { path: 'meetingList', component: MeetingListComponent, canActivate: [AuthGuard] },
  { path: 'moreDetails/:id', component: MoreDetailsComponent, canActivate: [AuthGuard] },
  { path: 'actionDiscussion/:id', component: ActionDiscussionComponent, canActivate: [AuthGuard] },
  { path: 'actionDiscussion', component: ActionDiscussionComponent, canActivate: [AuthGuard] },
  { path: 'quarterMeetings', component: QuarterMeetingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'quarterMeetings/:startDateVal', component: QuarterMeetingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'createUser', component: CreateUserComponent, canActivate: [AuthGuard, AdminGuard] },
];
