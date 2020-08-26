
import { observable, action } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';

import moment, { Moment } from 'moment';


@autobind
@mobxService
class MemberMonthlyPunchTimelineService {
  //
  static readonly instanceName = 'memberMonthlyPunchTimelineService';
  static instance: MemberMonthlyPunchTimelineService;

  @observable
  date: string = '';


  @action
  setDate(date: Moment | Date) {
    //
    const today = moment();
    const momentDate = moment(date);

    this.date = momentDate.format('YYYY-MM') === today.format('YYYY-MM') ?
      today.format('MM월 DD일 (dddd)') : moment(date).format('MM월');
  }
}

MemberMonthlyPunchTimelineService.instance = new MemberMonthlyPunchTimelineService();
export default MemberMonthlyPunchTimelineService;
