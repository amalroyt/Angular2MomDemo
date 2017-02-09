import { Injectable } from '@angular/core';

import { Meeting } from './meetingList';
import { MeetingList } from './mock-meetingList';

@Injectable()
export class MeetingListService {
  getMeetingList(): Promise<Meeting[]> {
    return Promise.resolve(MeetingList);
  }
}
