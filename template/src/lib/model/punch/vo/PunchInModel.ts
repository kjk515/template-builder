
import { fromDomain, autobind, LocalDateTimeModel } from '@nara.platform/accent';
import { extendObservable } from 'mobx';
import moment, { Moment } from 'moment';
import GeoCoordinateModel from './GeoCoordinateModel';


@autobind
@fromDomain
class PunchInModel {
  //
  coordinate: GeoCoordinateModel | null = null;
  office: string = '';
  time: Moment = moment();    // 실제시간과 다를때에만 입력
  punchTime: Moment = moment();         // Backend에서 입력되는 시스템 상 시간
  comment: string = '';


  constructor(punchIn?: PunchInModel) {
    //
    extendObservable(this, {
      coordinate: punchIn ? punchIn.coordinate : new GeoCoordinateModel(),
      office: punchIn ? punchIn.office : '',
      time: punchIn ? punchIn.time : moment(),
      punchTime: punchIn ? punchIn.punchTime : moment(),
      comment: punchIn ? punchIn.comment : '',

      timeChangeable: false,
    });
  }

  static fromDomain(domain: PunchInModel): PunchInModel {
    const punchInModel = new PunchInModel(domain);

    punchInModel.coordinate = domain.coordinate ? GeoCoordinateModel.fromDomain(domain.coordinate) : null;

    punchInModel.time = domain.time && LocalDateTimeModel.fromDomain(domain.time).toMoment();
    punchInModel.punchTime = domain.punchTime && LocalDateTimeModel.fromDomain(domain.punchTime).toMoment();

    return punchInModel;
  }
}

export default PunchInModel;
