import { Injectable } from '@angular/core';

import { MoreDetails} from './moreDetailsList';
import { MoreDetailsList } from './mock-moreDetailsList';

@Injectable()
export class MoreDetailsListService {
  getMoreDetailsList(): Promise<MoreDetails[]> {
    return Promise.resolve(MoreDetailsList);
  }
}
