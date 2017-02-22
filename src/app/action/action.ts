export class Action {

  constructor(

    public actionDesc: string,
    public openSince: Date,
    public expectedCompletion: Date,
    public actualCompletion: Date,
    public meetingId?: string,
    public status?: string,
    public responsible?: string

  ) { }

}
