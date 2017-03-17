export interface Meeting {
    meetingId: string; // text
    meetingType: string; // number
    meetingStatus: string; // radio
    meetingTitle: string; // select (primitive)
    meetingPurpose: string;
    meetingFacilitator: string;
    meetingRecorder: string;
    meetingVenue: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
    meetingAgenda?: string; // checkbox toggle either 'toggled' or 'untoggled'
    meetingAttendees : any[];
}
