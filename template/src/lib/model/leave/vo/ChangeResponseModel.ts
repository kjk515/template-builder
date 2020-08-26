
import { fromDomain, autobind, mobxUtils } from '@nara.platform/accent';


@autobind
@fromDomain
class ChangeResponseModel {
  //
  accepted: boolean;
  comment: string = '';
  time: number = 0;


  constructor(accepted: boolean) {
    //
    this.accepted = accepted;
  }

  static fromDomain(domain: ChangeResponseModel): ChangeResponseModel {
    //
    const changeResponse = new ChangeResponseModel(domain.accepted);

    changeResponse.comment = domain.comment;
    changeResponse.time = domain.time;

    return changeResponse;
  }
}

mobxUtils.decorateObservable(ChangeResponseModel);
export default ChangeResponseModel;
