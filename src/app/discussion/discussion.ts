export class Discussion {

  constructor(
    public meetingId: string,
    public discussion: string,
    public decision: string,
    public discussionBy?: string,
    public discussionType?: string,
    public decisionBy?: string

  ) { }

}
