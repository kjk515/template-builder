
import { fromDomain, autobind, LocalDateTimeModel } from '@nara.platform/accent';
import { extendObservable } from 'mobx';
import moment, { Moment } from 'moment';

import GeoCoordinateModel from './GeoCoordinateModel';


@autobind
@fromDomain
class PunchOutModel {
  //
  coordinate: GeoCoordinateModel | null = null;
  office: string = '';
  time: Moment = moment();    // 실제시간과 다를때에만 입력
  punchTime: Moment = moment();         // Backend에서 입력되는 시스템 상 시간
  comment: string = '';


  constructor(punchOut?: PunchOutModel) {
    //
    extendObservable(this, {
      coordinate: punchOut ? punchOut.coordinate : new GeoCoordinateModel(),
      office: punchOut ? punchOut.office : '',
      time: punchOut ? punchOut.time : moment(),
      punchTime: punchOut ? punchOut.punchTime : moment(),
      comment: punchOut ? punchOut.comment : '',

      timeChangeable: false,
    });
  }

  static fromDomain(domain: PunchOutModel): PunchOutModel {
    //
    const punchOutModel = new PunchOutModel(domain);

    punchOutModel.coordinate = domain.coordinate ? GeoCoordinateModel.fromDomain(domain.coordinate) : null;
    punchOutModel.time = LocalDateTimeModel.fromDomain(domain.time).toMoment();
    punchOutModel.punchTime = LocalDateTimeModel.fromDomain(domain.punchTime).toMoment();

    return punchOutModel;
  }
}

export default PunchOutModel;
