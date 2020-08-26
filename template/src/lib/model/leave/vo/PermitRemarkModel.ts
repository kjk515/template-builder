
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';


@autobind
@fromDomain
class PermitRemarkModel {
  //
  permitCount: number;
  remark: string = '';


  constructor(permitCount: number) {
    //
    this.permitCount = permitCount;
  }

  static fromDomain(domain: PermitRemarkModel): PermitRemarkModel {
    //
    const permitRemark = new PermitRemarkModel(domain.permitCount);

    permitRemark.remark = domain.remark;

    return permitRemark;
  }
}

mobxUtils.decorateObservable(PermitRemarkModel);
export default PermitRemarkModel;
