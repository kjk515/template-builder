
import { extendObservable } from 'mobx';


class BriefTimeModel {
  //
  hour: number = 0;
  minute: number = 0;

  constructor(briefTime?: BriefTimeModel) {
    //
    extendObservable(this, {
      hour: briefTime ? briefTime.hour : 0,
      minute: briefTime ? briefTime.minute : 0,
    });
  }

  static ofHour(hour: number) {
    //
    const minute = 0;
    return new BriefTimeModel({ hour, minute });
  }
}

export default BriefTimeModel;
