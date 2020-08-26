import { action, computed, observable } from 'mobx';
import { autobind, mobxService, observableArray } from '@nara.platform/accent';
import moment, { Moment } from 'moment';
import { NameTextModel } from '@nara.platform/react-ui';


@autobind
@mobxService
class PunchInOutService {
  //
  static readonly instanceName = 'punchInOutService';
  static instance: PunchInOutService;

  @observableArray
  hourOption: NameTextModel[] = [];

  @observable
  hour: string = '';

  @observableArray
  minuteOption: NameTextModel[] = [];

  @observable
  minute: string = '';

  @observableArray
  dateOption: NameTextModel[] = [];

  @observable
  date: string = '';

  @observable
  baseDate: Moment = moment();

  @computed
  get time(): Moment | null {
    //
    if (this.date && this.hour && this.minute) {
      const calculatedTime = moment(this.date);

      calculatedTime.set('hour', parseInt(this.hour, 10));
      calculatedTime.set('minute', parseInt(this.minute, 10));
      return calculatedTime;
    }
    return null;
  }

  @action
  setBaseDate(date: Moment) {
    //
    this.baseDate = date;
  }

  @action
  setDate(date: string) {
    this.date = date;
  }

  @action
  setHour(hour: string) {
    this.hour = hour;
  }

  @action
  setMinute(minute: string) {
    this.minute = minute;
  }

  @action
  initTimeProps() {
    const now = moment();

    this.date = this.dateOption[0].value + '';
    this.hour = this.hourOption[now.hour()].value + '';
    this.minute = this.minuteOption[now.minute()].value + '';
  }

  @action
  makeHourOption() {
    //
    const hourOption: NameTextModel[] = [];

    for (let i = 0; i < 24; i++) {
      const hour = moment(i, 'h').format('HH');

      hourOption.push(new NameTextModel(i.toString(), hour, hour));
    }

    this.hourOption = hourOption;
  }

  @action
  makeMinuteOption() {
    //
    const minuteOption: NameTextModel[] = [];

    for (let i = 0; i < 60; i++) {
      const minute = moment(i, 'mm').format('mm');

      minuteOption.push(new NameTextModel(i.toString(), minute, minute));
    }

    this.minuteOption = minuteOption;
  }

  @action
  makeDateOption() {
    //
    const dateOption: NameTextModel[] = [];

    const date = this.baseDate;
    const todayFormat = '당일 - ' + date.format('YYYY년 MM월 DD일 (ddd)');

    dateOption.push(new NameTextModel('0'.toString(), todayFormat, date.format('YYYY-MM-DD')));
    for (let i = 1; i < 7; i++) {

      const date = this.baseDate.subtract(1, 'day');
      const dateFormat = i + '일전 - ' + date.format('YYYY년 MM월 DD일 (ddd)');

      dateOption.push(new NameTextModel(i.toString(), dateFormat, date.format('YYYY-MM-DD')));
    }

    this.dateOption = dateOption;
  }

  @action
  clearAllOptions() {
    this.dateOption = [];
    this.hourOption = [];
    this.minuteOption = [];
    this.baseDate = moment();
  }

  @action
  clearAllSelectedTimeProps() {
    this.date = '';
    this.hour = '';
    this.minute = '';
  }
}

PunchInOutService.instance = new PunchInOutService();
export default PunchInOutService;
