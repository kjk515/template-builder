
import { autobind, fromDomain, CineroomEntityModel, NameValueListModel } from '@nara.platform/accent';
import { extendObservable } from 'mobx';
import PunchInModel from './PunchInModel';
import PunchOutModel from './PunchOutModel';


@autobind
@fromDomain
class DailyPunchModel extends CineroomEntityModel {
  //
  office: string = '';
  workingMinute: number = 0;
  complete: boolean = false;
  punchIn: PunchInModel = new PunchInModel();
  punchOut: PunchOutModel | null = null;


  constructor(dailyPunch?: DailyPunchModel) {
    //
    super(dailyPunch);

    extendObservable(this, {
      office: dailyPunch ? dailyPunch.office : '',
      workingMinute: dailyPunch ? dailyPunch.workingMinute : 0,
      complete: dailyPunch ? dailyPunch.complete : false,
      punchIn: dailyPunch ? dailyPunch.punchIn : new PunchInModel(),
      punchOut: dailyPunch ? dailyPunch.punchOut : null,
    });
  }

  static fromDomain(domain: DailyPunchModel): DailyPunchModel {
    //
    const dailyPunchModel = new DailyPunchModel(domain);

    dailyPunchModel.punchIn = PunchInModel.fromDomain(domain.punchIn);
    dailyPunchModel.punchOut = domain.punchOut ? PunchOutModel.fromDomain(domain.punchOut) : null;

    return dailyPunchModel;
  }

  static asNameValues(dailyPunch: DailyPunchModel): NameValueListModel {
    //
    return NameValueListModel.fromModel(DailyPunchModel, dailyPunch, {
      complete: JSON,
      punchIn: JSON,
      punchOut: JSON,
    });
  }

  get isPunchInDiffActual() {
    return !this.punchIn.time.isSame(this.punchIn.punchTime);
  }

  get isPunchOutDiffActual() {
    return this.punchOut && !this.punchOut.time.isSame(this.punchOut.punchTime);
  }

  get isPunchOut() {
    return this.punchOut && this.punchOut.punchTime;
  }
}

export default DailyPunchModel;
