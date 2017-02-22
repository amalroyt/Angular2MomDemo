export interface Meeting {
    meeting_id: string; // text
    meeting_type: string; // number
    meeting_status: string; // radio
    meeting_title: string; // select (primitive)
    meeting_purpose: string;
    meeting_facilitator: string;
    meeting_recorder: string;
    meeting_venue: string;
    meeting_date: string;
    meeting_starttime: string;
    meeting_endtime: string;

    agenda?: string; // checkbox toggle either 'toggled' or 'untoggled'
}
