import { Injectable } from '@angular/core';

import { MoreDetailsPoints} from './moreDetailsPointsList';
import { MoreDetailsPointsList } from './mock-moreDetailsPointsList';

@Injectable()
export class MoreDetailsPointsListService {
  getMoreDetailsPointsList(): Promise<MoreDetailsPoints[]> {
    return Promise.resolve(MoreDetailsPointsList);
  }
}
