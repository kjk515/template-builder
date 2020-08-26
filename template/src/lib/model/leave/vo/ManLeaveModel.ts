
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';
import LeaveCategoryType from '~/lib/model/shared/LeaveCategoryType';


@autobind
@fromDomain
class ManLeaveModel {
  //
  memberId: string;
  memberName: string;
  category: LeaveCategoryType;


  constructor(memberId: string, memberName: string, category: LeaveCategoryType) {
    //
    this.memberId = memberId;
    this.memberName = memberName;
    this.category = category;
  }

  static fromDomain(domain: ManLeaveModel): ManLeaveModel {
    //
    return new ManLeaveModel(domain.memberId, domain.memberName, domain.category);
  }
}

mobxUtils.decorateObservable(ManLeaveModel);
export default ManLeaveModel;
