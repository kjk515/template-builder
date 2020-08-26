
import { fromDomain, mobxUtils, IdNameModel, CineroomEntityModel, LocalDateModel, DatePeriodModel } from '@nara.platform/accent';
import { LeaveCategoryType } from '~/lib/model/shared';


@fromDomain
class LeaveManDayModel extends CineroomEntityModel {
  //
  // TODO query === entity?
  yearMonth: string;
  date: LocalDateModel;
  member: IdNameModel;
  category: LeaveCategoryType;
  period: DatePeriodModel;
  leavePlanId: string;
  projectId: string;


  constructor(leaveManDay: LeaveManDayModel = {} as any) {
    //
    super(leaveManDay);

    this.yearMonth = leaveManDay.yearMonth;
    this.date = leaveManDay.date;
    this.member = leaveManDay.member;
    this.category = leaveManDay.category;
    this.period = leaveManDay.period;
    this.leavePlanId = leaveManDay.leavePlanId;
    this.projectId = leaveManDay.projectId;
  }

  static fromDomain(domain: LeaveManDayModel): LeaveManDayModel {
    //
    const leaveManDay = new LeaveManDayModel(domain);

    if (domain.date) {
      leaveManDay.date = LocalDateModel.fromDomain(domain.date);
    }
    return leaveManDay;
  }

  static fromDomains(domains: LeaveManDayModel[]): LeaveManDayModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }
}

mobxUtils.decorateObservable(LeaveManDayModel);
export default LeaveManDayModel;
