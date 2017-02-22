export class Discussion {

  constructor(

    public discussion: string,
    public decision: string,
    public meetingId?: string,
    public discussionBy?: string,
    public discussionType?: string,
    public decisionBy?: string

  ) { }

}
