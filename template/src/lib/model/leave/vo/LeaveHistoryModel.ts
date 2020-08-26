
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';

import PermitRemark from './PermitRemarkModel';
import UsedRemark from './UsedRemarkModel';


@autobind
@fromDomain
class LeaveHistoryModel {
  //
  permitCount: number;
  permitRemarks: PermitRemark[] = [];

  usedCount: number = 0;
  usedRemarks: UsedRemark[] = [];


  constructor(permitCount: number) {
    //
    this.permitCount = permitCount;
  }

  static fromDomain(domain: LeaveHistoryModel): LeaveHistoryModel {
    //
    const leaveHistory = new LeaveHistoryModel(domain.permitCount);

    leaveHistory.permitRemarks = domain.permitRemarks;
    leaveHistory.usedCount = domain.usedCount;
    leaveHistory.usedRemarks = domain.usedRemarks;

    return leaveHistory;
  }
}

mobxUtils.decorateObservable(LeaveHistoryModel);
export default LeaveHistoryModel;
