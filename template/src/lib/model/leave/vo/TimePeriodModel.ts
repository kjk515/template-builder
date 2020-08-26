
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';


@autobind
@fromDomain
class TimePeriodModel {
  //
  static readonly WorkStartTime = '09:00';
  static readonly HalfOffTime = '14:00';
  static readonly WorkEndTime = '18:00';
  static readonly LunchTime = '12:00';

  startTime: string = '';
  endTime: string = '';


  constructor(startTime?: string, endTime?: string) {
    //
    if (startTime) {
      this.startTime = startTime;
    }
    if (endTime) {
      this.endTime = endTime;
    }
  }

  get startHour() {
    const startTime = this.startTime || TimePeriodModel.WorkStartTime;
    return startTime.split(':')[0];
  }

  set startHour(value) {
    this.startTime = `${value}:${this.startMinute}`;
  }

  get startMinute() {
    const startTime = this.startTime || TimePeriodModel.WorkStartTime;
    return startTime.split(':')[1];
  }

  set startMinute(value) {
    this.startTime = `${this.startHour}:${value}`;
  }

  get endHour() {
    const endTime = this.endTime || TimePeriodModel.WorkEndTime;
    return endTime.split(':')[0];
  }

  set endHour(value) {
    this.endTime = `${value}:${this.endMinute}`;
  }

  get endMinute() {
    const endTime = this.endTime || TimePeriodModel.WorkEndTime;
    return endTime.split(':')[1];
  }

  set endMinute(value) {
    this.endTime = `${this.endHour}:${value}`;
  }

  static fromDomain(domain: TimePeriodModel): TimePeriodModel {
    //
    return new TimePeriodModel(domain.startTime, domain.endTime);
  }
}

mobxUtils.decorateObservable(TimePeriodModel);
export default TimePeriodModel;
