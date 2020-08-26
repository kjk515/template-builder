
import { fromDomain, autobind, mobxUtils, IdNameModel } from '@nara.platform/accent';
import ChangeResponseModel from './ChangeResponseModel';


@autobind
@fromDomain
class ChangeRequestModel {
  //
  requester: IdNameModel;
  comment: string = '';
  response: ChangeResponseModel | null = null;

  editable: boolean;


  get responseComment() {
    return this.response ? this.response.comment : '';
  }

  set responseComment(value: any) {
    //
    if (!this.response) {
      this.response = new ChangeResponseModel(false);
    }
    this.response.comment = value;
  }

  constructor(requester: IdNameModel, editable: boolean) {
    //
    this.requester = requester;
    this.editable = editable;
  }

  static fromDomain(domain: ChangeRequestModel): ChangeRequestModel {
    //
    const changeRequest = new ChangeRequestModel(domain.requester, false);

    changeRequest.comment = domain.comment;
    changeRequest.response = domain.response ? ChangeResponseModel.fromDomain(domain.response) : null;

    return changeRequest;
  }

  static fromDomains(domains: ChangeRequestModel[]): ChangeRequestModel[] {
    //
    return domains.map(domain => ChangeRequestModel.fromDomain(domain));
  }
}

mobxUtils.decorateObservable(ChangeRequestModel);
export default ChangeRequestModel;
