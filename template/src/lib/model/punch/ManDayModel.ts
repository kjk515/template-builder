
import { computed, extendObservable } from 'mobx';
import moment, { Moment } from 'moment';
import {
  fromDomain, autobind, IdNameModel, NameValueListModel, NotInstantiatedException, CineroomEntityModel, LocalDateModel,
} from '@nara.platform/accent';

import { LeaveCategoryType } from '../shared';
import DayOnModel from './vo/DayOnModel';
import DayOffModel from './vo/DayOffModel';
import DutyType from './vo/DutyType';
import DailyPunchModel from './vo/DailyPunchModel';


@autobind
@fromDomain
class ManDayModel extends CineroomEntityModel {
  //
  zoneId: string = '';
  date: Moment = moment();
  holiday: boolean = false;
  member: IdNameModel = new IdNameModel();          // member id is UUID, not audience id
  dutyType: DutyType | null = null;                 // backend model can be null
  dayOn: DayOnModel | null = null;
  dayOff: DayOffModel | null = null;
  projectDayId: string = '';
  projectId: string = '';

  dailyPunches: DailyPunchModel[] = [];


  constructor(manDay?: ManDayModel) {
    //
    super(manDay);

    extendObservable(this, {
      zoneId: manDay ? manDay.zoneId : '',
      date: manDay ? manDay.date : moment(),
      holiday: manDay ? manDay.holiday : false,
      member: manDay ? manDay.member : new IdNameModel(),
      dutyType: manDay ? manDay.dutyType : null,
      dayOn: manDay ? manDay.dayOn : null,
      dayOff: manDay ? manDay.dayOff : null,
      projectId: manDay ? manDay.projectId : '',
      projectDayId: manDay ? manDay.projectDayId : '',
      dailyPunches: manDay ? manDay.dailyPunches : [],
    });
  }

  static fromDomains(domains: ManDayModel[]): ManDayModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }


  static fromDomain(domain: ManDayModel | any): ManDayModel {
    //
    const manDayModel = new ManDayModel(domain);

    manDayModel.member = domain.memberId && new IdNameModel(domain.memberId, domain.memberName);
    manDayModel.dayOn = domain.dayOn ? DayOnModel.fromDomain(domain.dayOn) : null;
    manDayModel.dayOff = domain.dayOff ? DayOffModel.fromDomain(domain.dayOff) : null;
    manDayModel.date = domain.date ? LocalDateModel.fromDomain(domain.date).toMoment() : moment();
    manDayModel.dailyPunches = domain.dailyPunches ?
      domain.dailyPunches.map((dailyPunch: DailyPunchModel) => DailyPunchModel.fromDomain(dailyPunch)) : [];

    return manDayModel;
  }

  static asNameValuesForPunchInOut(manDay: ManDayModel): NameValueListModel {
    //
    if (!manDay.dayOn) {
      throw new NotInstantiatedException('ManDayModel', 'manDay.dayOn');
    }

    return NameValueListModel.fromModel(ManDayModel, manDay, {
      dayOn: JSON,
    });
  }

  static asNameValuesForDayOff(manDay: ManDayModel): NameValueListModel {
    //
    return NameValueListModel.fromModel(ManDayModel, manDay, {
      dayOff: JSON,
    });
  }


  @computed
  get workingMinutes(): number {
    //
    let workingMinutes = 0;

    if (!this.dayOn) {
      return workingMinutes;
    }

    const punchInTime = this.dayOn.punchInTime;

    if (this.dayOn.punchOutTime === null) {
      let endTime = moment();

      if (!endTime.isSame(punchInTime, 'date')) {
        endTime = this.date.endOf('day');
      }

      workingMinutes = moment.duration(endTime.diff(punchInTime)).asMinutes();
    }
    else {
      const punchOutTime = this.dayOn.punchOutTime;

      workingMinutes = moment.duration(punchOutTime.diff(punchInTime)).asMinutes();
    }

    return workingMinutes;
  }

  @computed
  get punchable(): boolean {
    //
    return this.dutyType !== DutyType.Leave;
  }

  @computed
  get isPunchOut(): boolean {
    //
    if (this.dayOn) {
      return this.dayOn.punchOutTime !== null;
    }
    return false;
  }

  @computed
  get isPunchIn(): boolean {
    //
    if (this.dayOn) {
      return this.dayOn.punchInTime !== null;
    }
    return false;
  }

  @computed
  get punchCount(): number {
    //
    return this.dayOn && this.dayOn.punchCount || 0;
  }

  @computed
  get punchInTime(): Moment | null {
    return this.dayOn && this.dayOn.punchInTime || null;
  }

  @computed
  get punchOutTime(): Moment | null {
    return this.dayOn && this.dayOn.punchOutTime || null;
  }

  @computed
  get punchInHour() {
    return this.punchInTime && this.punchInTime.hour();
  }

  @computed
  get punchInMinute() {
    return this.punchInTime && this.punchInTime.minute();
  }

  @computed
  get punchOutHour() {
    return this.punchOutTime && this.punchOutTime.hour();
  }

  @computed
  get punchOutMinute() {
    return this.punchOutTime && this.punchOutTime.minute();
  }

  @computed
  get dayOffComment() {
    return this.dayOff && this.dayOff.comment;
  }

  @computed
  get leaveCategory() {
    return this.dayOff && this.dayOff.category || LeaveCategoryType.Vacation;
  }
}

export default ManDayModel;
