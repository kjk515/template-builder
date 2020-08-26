
import { observable, action } from 'mobx';
import { autobind, mobxService, observableArray } from '@nara.platform/accent';
import moment, { Moment } from 'moment';


@autobind
@mobxService
class ProjectMonthlyLogService {
  //
  static readonly instanceName = 'projectMonthlyLogService';
  static instance: ProjectMonthlyLogService;

  @observable
  date: Moment = moment();

  @observableArray
  dates: string[] = [];

  @action
  setYearMonth(yearMonth: Moment) {
    //
    this.date = yearMonth;
  }

  @action
  setYearMonthDates(yearMonth: Moment) {
    //
    const lastDate = moment(yearMonth).endOf('month').date();
    const dates: string[] = [];

    for (let i = 0; i < lastDate; i++) {
      //
      dates.push(moment(yearMonth).startOf('month').add(i, 'd').format('YYYY-MM-DD'));
    }

    this.dates = dates;
  }
}

ProjectMonthlyLogService.instance = new ProjectMonthlyLogService();
export default ProjectMonthlyLogService;
