
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';

import LeaveHistory from './LeaveHistoryModel';


@autobind
@fromDomain
class YearLeaveHistoryModel {
  //
  monthLeaves: LeaveHistory | null = null;
  yearLeaves: LeaveHistory | null = null;
  addedLeaves: LeaveHistory | null = null;


  set monthPermitCount(value: number) {
    //
    if (!this.monthLeaves) {
      this.monthLeaves = new LeaveHistory(value);
    }
    else {
      this.monthLeaves.permitCount = value;
    }
  }

  set yearPermitCount(value: number) {
    //
    if (!this.yearLeaves) {
      this.yearLeaves = new LeaveHistory(value);
    }
    else {
      this.yearLeaves.permitCount = value;
    }
  }

  set addedPermitCount(value: number) {
    //
    if (!this.addedLeaves) {
      this.addedLeaves = new LeaveHistory(value);
    }
    else {
      this.addedLeaves.permitCount = value;
    }
  }


  static fromDomain(domain: YearLeaveHistoryModel): YearLeaveHistoryModel {
    //
    const yearLeaveHistory = new YearLeaveHistoryModel();

    yearLeaveHistory.monthLeaves = domain.monthLeaves;
    yearLeaveHistory.yearLeaves = domain.yearLeaves;
    yearLeaveHistory.addedLeaves = domain.addedLeaves;

    return yearLeaveHistory;
  }
}

mobxUtils.decorateObservable(YearLeaveHistoryModel);
export default YearLeaveHistoryModel;
