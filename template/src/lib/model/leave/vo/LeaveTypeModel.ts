
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';
import { LeaveCategoryType } from '../../shared';


@autobind
@fromDomain
class LeaveTypeModel {
  //
  category: LeaveCategoryType;
  regular: boolean = true;
  personal: boolean = true;


  constructor(category: LeaveCategoryType) {
    //
    this.category = category;
  }

  static fromDomain(domain: LeaveTypeModel): LeaveTypeModel {
    //
    const leaveType = new LeaveTypeModel(domain.category);

    leaveType.regular = domain.regular;
    leaveType.personal = domain.personal;

    return leaveType;
  }
}

mobxUtils.decorateObservable(LeaveTypeModel);
export default LeaveTypeModel;
