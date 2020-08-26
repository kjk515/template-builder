
import { fromDomain, autobind, mobxUtils, NameValueListModel, CineroomEntityModel } from '@nara.platform/accent';
import moment from 'moment';

import YearLeaveHistoryModel from './vo/YearLeaveHistoryModel';


@autobind
@fromDomain
class YearLeaveModel extends CineroomEntityModel {
  //
  year: number;
  memberId: string;
  memberName: string = '';
  companyCareerYear: number = 0;
  yearLeaveHistory: YearLeaveHistoryModel | null = null;


  get permitStartDate() {
    return moment(super.creationTime).format('YYYY.MM.DD');
  }

  get permitEndDate() {
    return moment().endOf('year').format('YYYY.MM.DD');
  }

  get permitCounts() {
    //
    if (!this.yearLeaveHistory) {
      return { month: 0, year: 0, added: 0 };
    }

    return {
      month: this.yearLeaveHistory.monthLeaves && this.yearLeaveHistory.monthLeaves.permitCount || 0,
      year: this.yearLeaveHistory.yearLeaves && this.yearLeaveHistory.yearLeaves.permitCount || 0,
      added: this.yearLeaveHistory.addedLeaves && this.yearLeaveHistory.addedLeaves.permitCount || 0,
    };
  }

  get usedCounts() {
    //
    if (!this.yearLeaveHistory) {
      return { month: 0, year: 0, added: 0 };
    }

    return {
      month: this.yearLeaveHistory.monthLeaves && this.yearLeaveHistory.monthLeaves.usedCount || 0,
      year: this.yearLeaveHistory.yearLeaves && this.yearLeaveHistory.yearLeaves.usedCount || 0,
      added: this.yearLeaveHistory.addedLeaves && this.yearLeaveHistory.addedLeaves.usedCount || 0,
    };
  }

  get totalPermitRegularLeaveCounts() {
    return Number(this.permitCounts.month) + Number(this.permitCounts.year) || 0;
  }

  get totalUsedRegularLeaveCounts() {
    //
    if (!this.yearLeaveHistory) {
      return 0;
    }

    const month = this.yearLeaveHistory.monthLeaves && this.yearLeaveHistory.monthLeaves.usedCount || 0;
    const year = this.yearLeaveHistory.yearLeaves && this.yearLeaveHistory.yearLeaves.usedCount || 0;

    return Number(month) + Number(year) || 0;
  }

  get overCounts() {
    return this.totalPermitRegularLeaveCounts > this.totalUsedRegularLeaveCounts ?
      0
      : this.totalUsedRegularLeaveCounts - this.totalPermitRegularLeaveCounts;
  }

  set permitCounts(value) {
    //
    if (!this.yearLeaveHistory) {
      return;
    }

    this.yearLeaveHistory.monthPermitCount = value.month;
    this.yearLeaveHistory.yearPermitCount = value.year;
    this.yearLeaveHistory.addedPermitCount = value.added;
  }


  constructor(year: number, memberId: string, domain?: YearLeaveModel) {
    //
    super(domain);

    this.year = year;
    this.memberId = memberId;
  }

  static fromDomain(domain: YearLeaveModel): YearLeaveModel {
    //
    const yearLeave = new YearLeaveModel(domain.year, domain.memberId, domain);

    yearLeave.memberName = domain.memberName;
    yearLeave.companyCareerYear = domain.companyCareerYear;
    yearLeave.yearLeaveHistory = domain.yearLeaveHistory ? YearLeaveHistoryModel.fromDomain(domain.yearLeaveHistory) : null;

    return yearLeave;
  }

  static fromDomains(domains: YearLeaveModel[]): YearLeaveModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(yearLeave: YearLeaveModel): NameValueListModel {
    //
    return NameValueListModel.fromModel(YearLeaveModel, yearLeave, {
      companyCareerYear: String,
      yearLeaveHistory: JSON,
    });
  }
}

mobxUtils.decorateObservable(YearLeaveModel);
export default YearLeaveModel;
