
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';
import moment from 'moment';
import ManLeaveModel from './ManLeaveModel';


@autobind
@fromDomain
class DayLeaveModel {
  //
  day: number = 0;
  manLeaves: ManLeaveModel[] = [];


  constructor(day: number) {
    //
    this.day = day;
    this.manLeaves = [];
  }

  static fromDomain(domain: DayLeaveModel): DayLeaveModel {
    //
    const dayLeave = new DayLeaveModel(domain.day);

    dayLeave.manLeaves = domain.manLeaves.map(manLeave => ManLeaveModel.fromDomain(manLeave));

    return dayLeave;
  }

  getStringDate(yearMonth: string) {
    //
    return moment(yearMonth, 'YYYY-MM').date(this.day).format('YYYY-MM-DD');
  }
}

mobxUtils.decorateObservable(DayLeaveModel);
export default DayLeaveModel;
