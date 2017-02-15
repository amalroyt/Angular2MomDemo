import { Injectable } from '@angular/core';

import { MoreDetailsAction} from './moreDetailsActionList';
import { MoreDetailsActionList } from './mock-moreDetailsActionList';

@Injectable()
export class MoreDetailsActionListService {
  getMoreDetailsActionList(): Promise<MoreDetailsAction[]> {
    return Promise.resolve(MoreDetailsActionList);
  }
}
