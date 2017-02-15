export class Action {

  constructor(
    public meetingId: string,
    public actionDesc: string,
    public openSince: Date,
    public expectedCompletion: Date,
    public actualCompletion: Date,
    public status?: string,
    public responsible?: string

  ) { }

}
