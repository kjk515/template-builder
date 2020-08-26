
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';


@autobind
@fromDomain
class UsedRemarkModel {
  //
  usedCount: number;
  remark: string = '';


  constructor(usedCount: number) {
    //
    this.usedCount = usedCount;
  }

  static fromDomain(domain: UsedRemarkModel): UsedRemarkModel {
    //
    const usedRemark = new UsedRemarkModel(domain.usedCount);

    usedRemark.remark = domain.remark;

    return usedRemark;
  }
}

mobxUtils.decorateObservable(UsedRemarkModel);
export default UsedRemarkModel;
