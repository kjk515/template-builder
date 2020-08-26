
import { observable, action } from 'mobx';
import { autobind, mobxService, observableArray } from '@nara.platform/accent';
import moment, { Moment } from 'moment';
import { DutyType } from '~/lib/model';


@autobind
@mobxService
class MemberMonthlyLogService {
  //
  static readonly instanceName = 'memberMonthlyLogService';
  static instance: MemberMonthlyLogService;

  @observable
  date: Moment = moment();

  @observableArray
  dates: string[] = [];

  @observable
  workingDayCount: number = 0;

  @observable
  workingMinutes: number = 0;


  @action
  setYearMonth(yearMonth: Moment) {
    //
    this.date = yearMonth;
  }

  @action
  setYearMonthDatesByYearMonth(yearMonth: Moment) {
    //
    const lastDate = moment(yearMonth).endOf('month').date();
    const dates: string[] = [];

    for (let i = 0; i < lastDate; i++) {
      //
      dates.push(moment(yearMonth).startOf('month').add(i, 'd').format('YYYY-MM-DD'));
    }

    this.dates = dates;
  }

  @action
  setWorkingDayCount(dailyDutyTypes: (DutyType | null)[]) {
    //
    this.workingDayCount = dailyDutyTypes.filter(dailyDutyType => dailyDutyType === DutyType.Work).length;
  }

  @action
  setWorkingMinutes(dailyWorkingMinutes: number[]) {
    //
    this.workingMinutes = 0;

    if (dailyWorkingMinutes.length > 0) {
      dailyWorkingMinutes.map(dailyWorkingMinutes => this.workingMinutes += dailyWorkingMinutes);
    }
  }

}

MemberMonthlyLogService.instance = new MemberMonthlyLogService();
export default MemberMonthlyLogService;
