
import { fromDomain, autobind, LocalDateTimeModel } from '@nara.platform/accent';
import { extendObservable } from 'mobx';
import { Moment } from 'moment';


@autobind
@fromDomain
class DayOnModel {
  //
  punchInTime: Moment | null = null;
  punchOutTime: Moment | null = null;
  punchCount: number = 0;


  constructor(dayOn?: DayOnModel) {
    //
    extendObservable(this, {
      punchInTime: dayOn ? dayOn.punchInTime : null,
      punchOutTime: dayOn ? dayOn.punchOutTime : null,
      punchCount: dayOn ? dayOn.punchCount : 0,
    });
  }

  static fromDomain(domain: DayOnModel | any): DayOnModel {
    //
    const dayOnModel = new DayOnModel(domain);

    dayOnModel.punchInTime = domain.punchInTime && LocalDateTimeModel.fromDomain(domain.punchInTime).toMoment() || null;
    dayOnModel.punchOutTime = domain.punchOutTime && LocalDateTimeModel.fromDomain(domain.punchOutTime).toMoment() || null;

    return dayOnModel;
  }
}

export default DayOnModel;
