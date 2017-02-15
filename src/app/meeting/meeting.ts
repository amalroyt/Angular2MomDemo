export class Meeting {

  constructor(
    public meeting_id: string,
    public meeting_type: string,
    public meeting_status: string,
    public meeting_title: string,
    public meeting_purpose: string,
    public meeting_facilitator: string,
    public meeting_recorder: string,
    public meeting_venue: string,
    public meeting_date: string,
    public meeting_starttime: string,
    public meeting_endtime: string,
    public meeting_attendees: string,
    public agenda?: string
  ) {  }

}
