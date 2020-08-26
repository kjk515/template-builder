
import { autobind } from '@nara.platform/accent';
import { extendObservable } from 'mobx';
import { BriefTimeModel } from '../../shared';


@autobind
class TimeWindowModel {
  //
  startTime: BriefTimeModel = new BriefTimeModel();
  endTime: BriefTimeModel = new BriefTimeModel();
  workingTime: BriefTimeModel = new BriefTimeModel();


  constructor(timeWindow?: TimeWindowModel) {
    //
    extendObservable(this, {
      startTime: timeWindow ? timeWindow.startTime : new BriefTimeModel(),
      endTime: timeWindow ? timeWindow.endTime : new BriefTimeModel(),
      workingTime: timeWindow ? timeWindow.workingTime : new BriefTimeModel(),
    });
  }

  static newNineToSix(): TimeWindowModel {
    //
    return new TimeWindowModel({
      startTime: BriefTimeModel.ofHour(9),
      endTime: BriefTimeModel.ofHour(18),
      workingTime: BriefTimeModel.ofHour(18 - 9),
    });
  }
}

export default TimeWindowModel;
