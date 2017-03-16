// Import our dependencies
import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { MeetingComponent } from './meeting';
import { MeetingListComponent } from './meetingList';
import { MoreDetailsComponent } from './moreDetails';
import { ActionDiscussionComponent } from './actionDiscussion/actionDiscussion.component';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'meeting', component: MeetingComponent },
  { path: 'meetingList', component: MeetingListComponent },
  { path: 'moreDetails/:id', component: MoreDetailsComponent },
  { path: 'actionDiscussion/:id', component: ActionDiscussionComponent },
  { path: 'actionDiscussion', component: ActionDiscussionComponent }
];
