
import { fromDomain, autobind } from '@nara.platform/accent';
import { extendObservable } from 'mobx';

import { LeaveCategoryType } from '~/lib/model';


@autobind
@fromDomain
class DayOffModel {
  //
  category: LeaveCategoryType = LeaveCategoryType.Vacation;
  comment: string = '';

  leaveId: string = '';


  constructor(dayOff?: DayOffModel) {
    //
    extendObservable(this, {
      category: dayOff ? dayOff.category : LeaveCategoryType.Vacation,
      comment: dayOff ? dayOff.comment : '',
      leaveId: dayOff ? dayOff.leaveId : '',
    });
  }

  static fromDomain(domain: DayOffModel): DayOffModel {
    //
    const dayOffModel = new DayOffModel(domain);

    return dayOffModel;
  }
}

export default DayOffModel;
