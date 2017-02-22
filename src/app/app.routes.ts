// Import our dependencies
import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { MeetingListComponent } from './meetingList';
import { MoreDetailsComponent } from './moreDetails';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',       component: LoginComponent },
  { path: 'meetingList',  component: MeetingListComponent },
  { path: 'moreDetails/:id', component: MoreDetailsComponent }
];
