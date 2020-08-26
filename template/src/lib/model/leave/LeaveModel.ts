
import { autobind, mobxUtils, fromDomain, CineroomEntityModel, DatePeriodModel } from '@nara.platform/accent';
import moment from 'moment';

import LeaveTypeModel from './vo/LeaveTypeModel';
import LeaveState from './vo/LeaveState';
import TimePeriodModel from './vo/TimePeriodModel';


@autobind
@fromDomain
class LeaveModel extends CineroomEntityModel {
  //
  memberId: string;
  memberName: string = '';
  type: LeaveTypeModel;
  halfOffTimePeriod: TimePeriodModel | null = null;
  period: DatePeriodModel = new DatePeriodModel();
  dayCount: number = 0;
  comment: string = '';
  state: LeaveState = LeaveState.Leaving;


  get creationDate() {
    return moment(this.creationTime).format('YYYY.MM.DD');
  }

  get isFinished() {
    return this.state === LeaveState.Leaving
      && moment().isAfter(this.period.endDate, 'day');
  }

  get isRegular() {
    return this.type && this.type.regular;
  }

  // get leaveState() {
  //   if (!this.period.startDate || !this.period.endDate) {
  //     return this.state;
  //   }
  //   const today = moment();
  //
  //   if (today.isAfter(this.period.endDateMoment)) {
  //     return LeaveState.Leaving; // TODO : Finished
  //   }
  //   return LeaveState.Leaving;
  // }

  constructor(memberId: string, leaveType: LeaveTypeModel, domain?: CineroomEntityModel) {
    //
    super(domain);

    this.memberId = memberId;
    this.type = leaveType;
  }

  static fromDomain(domain: LeaveModel): LeaveModel {
    //
    const model = new LeaveModel(domain.memberId, domain.type, domain);

    model.memberName = domain.memberName;
    model.type = LeaveTypeModel.fromDomain(domain.type);
    model.halfOffTimePeriod = domain.halfOffTimePeriod ? TimePeriodModel.fromDomain(domain.halfOffTimePeriod) : null;
    model.period = DatePeriodModel.fromDomain(domain.period);
    model.dayCount = domain.dayCount;
    model.comment = domain.comment;
    model.state = domain.state;
    model.creationTime = domain.creationTime;

    return model;
  }

  static fromDomains(domains: LeaveModel[]): LeaveModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }
}

mobxUtils.decorateObservable(LeaveModel);
export default LeaveModel;
