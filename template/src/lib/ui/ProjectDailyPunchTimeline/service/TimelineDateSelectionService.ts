
import { observable, action } from 'mobx';
import moment, { Moment } from 'moment';
import { autobind, mobxService, observableArray } from '@nara.platform/accent';
import { NameTextModel } from '@nara.platform/react-ui';


@autobind
@mobxService
class TimelineDateSelectionService {
  //
  static readonly instanceName = 'timelineDateSelectionService';
  static instance: TimelineDateSelectionService;

  @observable
  selectedDate: Moment = moment();

  @observableArray
  dates: NameTextModel[] = [];


  @action
  setSelectedDate(date: Moment) {
    //
    this.selectedDate = date;
  }

  @action
  makeMonthDateList(baseDate: Moment): NameTextModel[] {
    //
    const today = moment();
    const todayYear = today.year();
    const todayMonth = today.month();

    const targetDate = moment(baseDate);
    const targetDateYear = targetDate.year();
    const targetDateMonth = targetDate.month();

    const dateList: NameTextModel[] = [];

    if (todayYear > targetDateYear || (todayYear === targetDateYear && todayMonth > targetDateMonth)) {
      for (let i = 0; i < targetDate.endOf('month').toDate().getDate(); i++) {
        const date = String(targetDate.date() - i) + '일';

        dateList.push(new NameTextModel(i.toString(), date, targetDate.subtract(i, 'd').format('YYYY-MM-DD')));
      }
    }
    else {
      for (let i = 0; i < today.date(); i++) {
        const date = String(today.date() - i) + '일';

        dateList.push(new NameTextModel(i.toString(), date, moment().subtract(i, 'day').format('YYYY-MM-DD')));
      }
    }

    this.dates = dateList;

    return dateList;
  }
}

TimelineDateSelectionService.instance = new TimelineDateSelectionService();
export default TimelineDateSelectionService;
