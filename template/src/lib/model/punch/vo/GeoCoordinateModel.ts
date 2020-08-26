
import { fromDomain, autobind } from '@nara.platform/accent';
import { extendObservable } from 'mobx';


@autobind
@fromDomain
class GeoCoordinateModel {
  //
  latitude: string = '';
  longitude: string = '';


  constructor(geoCoordinate?: GeoCoordinateModel) {
    //
    extendObservable(this, {
      latitude: geoCoordinate ? geoCoordinate.latitude : '',
      longitude: geoCoordinate ? geoCoordinate.longitude : '',
    });
  }

  static fromDomain(domain: GeoCoordinateModel): GeoCoordinateModel {
    //
    return new GeoCoordinateModel(domain);
  }
}

export default GeoCoordinateModel;
