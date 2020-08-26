
import { autobind, IdNameModel, mobxUtils } from '@nara.platform/accent';

import { ManDayModel } from '../punch';


@autobind
class ManDayTimelineModel {
  //
  member: IdNameModel = new IdNameModel();
  manDay: ManDayModel = new ManDayModel();
  hours: number[] = [];

  constructor(member: IdNameModel, manDay: ManDayModel, hours: number[]) {
    //
    this.member = member;
    this.manDay = manDay;
    this.hours = hours;
  }
}

mobxUtils.decorateObservable(ManDayTimelineModel);
export default ManDayTimelineModel;
