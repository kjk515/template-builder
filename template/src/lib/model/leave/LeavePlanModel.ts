
import {
  fromDomain, autobind, mobxUtils, IdNameModel, NameValueListModel, CineroomEntityModel, DatePeriodModel,
} from '@nara.platform/accent';
import moment from 'moment';

import { LeaveCategoryType } from '../shared';
import ChangeRequestModel from './vo/ChangeRequestModel';
import LeaveTypeModel from './vo/LeaveTypeModel';
import LeavePlanState from './vo/LeavePlanState';
import TimePeriodModel from './vo/TimePeriodModel';
import HalfOffType from './vo/HalfOffType';


@autobind
@fromDomain
class LeavePlanModel extends CineroomEntityModel {
  //
  memberId: string;
  memberName: string = '';
  type: LeaveTypeModel = new LeaveTypeModel(LeaveCategoryType.Vacation);
  halfOffTimePeriod: TimePeriodModel | null = null;
  period: DatePeriodModel = new DatePeriodModel();
  dayCount: number = 0;
  comment: string = '';
  state: LeavePlanState = LeavePlanState.Planned;
  changeRequests: ChangeRequestModel[] = [];
  registrant: IdNameModel;
  yearLeaveId: string = '';
  projectId: string = '';


  get possibleLeave() {
    return this.state === LeavePlanState.Planned
      && moment().isAfter(this.period.startDate.add(-24, 'hour'));
  }

  get creationDate() {
    return moment(this.creationTime).format('YYYY.MM.DD');
  }

  get halfOffType(): HalfOffType | null {
    //
    if (this.type.category !== LeaveCategoryType.HalfOff || !this.halfOffTimePeriod) {
      return null;
    }

    if (this.halfOffTimePeriod.startTime === TimePeriodModel.WorkStartTime
      && this.halfOffTimePeriod.endTime === TimePeriodModel.HalfOffTime) {
      return HalfOffType.Morning;
    }
    if (this.halfOffTimePeriod.startTime === TimePeriodModel.HalfOffTime
      && this.halfOffTimePeriod.endTime === TimePeriodModel.WorkEndTime) {
      return HalfOffType.Afternoon;
    }
    return HalfOffType.Custom;
  }

  set halfOffType(value: HalfOffType | null) {
    //
    switch (value) {
      case HalfOffType.Morning:
        this.halfOffTimePeriod = new TimePeriodModel(TimePeriodModel.WorkStartTime, TimePeriodModel.HalfOffTime);
        break;

      case HalfOffType.Afternoon:
        this.halfOffTimePeriod = new TimePeriodModel(TimePeriodModel.HalfOffTime, TimePeriodModel.WorkEndTime);
        break;

      case HalfOffType.Custom:
        this.halfOffTimePeriod = new TimePeriodModel();
        break;
    }
  }

  set typeCategory(value: LeaveCategoryType) {
    this.type.category = value;

    if (value !== LeaveCategoryType.HalfOff && value !== LeaveCategoryType.Vacation) {
      this.type.regular = false;
    }
  }

  set periodStartDate(value: Date) {
    this.period.startDateObj = value;
    this.period.endDateObj = value;
  }

  set periodEndDate(value: Date) {
    this.period.endDateObj = value;
  }

  get leaveCategory() {
    return this.type && this.type.category || null;
  }

  get isRegular() {
    return this.type && this.type.regular;
  }

  constructor(yearLeaveId: string, projectId: string, memberId: string, registrant: IdNameModel, domain?: CineroomEntityModel) {
    //
    super(domain);

    this.yearLeaveId = yearLeaveId;
    this.projectId = projectId;
    this.memberId = memberId;
    this.registrant = registrant;
  }

  static fromDomain(domain: LeavePlanModel): LeavePlanModel {
    //
    const model = new LeavePlanModel(domain.yearLeaveId, domain.projectId, domain.memberId, domain.registrant, domain);

    model.memberName = domain.memberName;
    model.type = LeaveTypeModel.fromDomain(domain.type);
    model.halfOffTimePeriod = domain.halfOffTimePeriod ? TimePeriodModel.fromDomain(domain.halfOffTimePeriod) : null;
    model.period = DatePeriodModel.fromDomain(domain.period);
    model.dayCount = domain.dayCount;
    model.comment = domain.comment;
    model.state = domain.state;
    model.changeRequests = domain.changeRequests ? ChangeRequestModel.fromDomains(domain.changeRequests) : [];
    model.creationTime = domain.creationTime;

    return model;
  }

  static fromDomains(domains: LeavePlanModel[]): LeavePlanModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: LeavePlanModel): NameValueListModel {
    //
    model.calculateDayCount();

    return NameValueListModel.fromModel(LeavePlanModel, model, {
      comment: String,
      state: String,
      changeRequests: JSON,
      period: JSON,
      dayCount: String,
      halfOffTimePeriod: JSON,
    });
  }

  calculateDayCount() {
    //
    const workingDays = this.period.workingDays;

    if (workingDays === 0) {
      this.dayCount = 0;
    }
    else if (this.leaveCategory === LeaveCategoryType.HalfOff) {
      this.dayCount = 0.5;
    }
    else {
      this.dayCount = workingDays;
    }
  }
}

mobxUtils.decorateObservable(LeavePlanModel);
export default LeavePlanModel;
