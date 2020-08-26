
import { fromDomain, autobind, mobxUtils, CineroomEntityModel } from '@nara.platform/accent';
import DutyType from '../vo/DutyType';


@fromDomain
@autobind
class ManMonthModel extends CineroomEntityModel {
  //
  memberId: string = '';
  memberName: string = '';
  yearMonth: string = '';
  dailyDutyTypes: (DutyType | null)[] = [];
  dailyWorkingMinutes: number[] = [];
  projectId: string = '';


  constructor(
    memberId: string,
    memberName: string,
    yearMonth: string,
    projectId: string,
    domain?: CineroomEntityModel,
  ) {
    //
    super(domain);

    this.memberId = memberId;
    this.memberName = memberName;
    this.yearMonth = yearMonth;
    this.projectId = projectId;
  }

  static fromDomain(domain: ManMonthModel): ManMonthModel {
    //
    const manMonth = new ManMonthModel(
      domain.memberId,
      domain.memberName,
      domain.yearMonth,
      domain.projectId,
      domain
    );

    manMonth.dailyDutyTypes = domain.dailyDutyTypes;
    manMonth.dailyWorkingMinutes = domain.dailyWorkingMinutes;

    return manMonth;
  }

  static fromDomains(domains: ManMonthModel[]) {
    //
    return domains.map(domain => this.fromDomain(domain));
  }
}

mobxUtils.decorateObservable(ManMonthModel);
export default ManMonthModel;
