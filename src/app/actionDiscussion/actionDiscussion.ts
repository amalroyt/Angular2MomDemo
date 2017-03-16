export class ActionDiscussion {

  constructor(

    public discussion: string,
    public decision: string,
    public discussionBy?: string,
    public discussionType?: string,
    public decisionBy?: string

  ) { }

}

export class Action {

  constructor(

    public actionDesc: string,
    public openSince: Date,
    public expectedCompletion: Date,
    public actualCompletion: Date,
    public status?: string,
    public responsible?: string

  ) { }

}
