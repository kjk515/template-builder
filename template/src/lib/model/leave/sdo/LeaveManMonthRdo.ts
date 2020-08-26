
import { fromDomain, autobind, IdNameModel, mobxUtils } from '@nara.platform/accent';
import LeaveManDayModel from '../query/LeaveManDayModel';


@autobind
@fromDomain
class LeaveManMonthRdo {
  //
  member: IdNameModel = new IdNameModel();
  yearMonth: string = '';
  leaveManDays: (LeaveManDayModel | null)[] = [];
  leaveCount: number = 0;


  constructor(member: IdNameModel, yearMonth: string, leaveManDays: (LeaveManDayModel | null)[], leaveCount: number) {
    //
    this.member = member;
    this.yearMonth = yearMonth;
    this.leaveManDays = leaveManDays;
    this.leaveCount = leaveCount;
  }

  static fromDomain(domain: LeaveManMonthRdo): LeaveManMonthRdo {
    //
    return new LeaveManMonthRdo(
      domain.member,
      domain.yearMonth,
      domain.leaveManDays,
      domain.leaveCount
    );
  }

  static fromDomains(domains: LeaveManMonthRdo[]): LeaveManMonthRdo[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  getFullStringDate(day: number) {
    //
    return this.yearMonth + '-' + this.makeStringDay(day);
  }

  makeStringDay(day: number): string {
    //
    if (day < 10) {
      return '0' + String(day);
    }
    else {
      return String(day);
    }
  }
}

mobxUtils.decorateObservable(LeaveManMonthRdo);
export default LeaveManMonthRdo;
