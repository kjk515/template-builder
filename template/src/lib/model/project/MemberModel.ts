
import {
  fromDomain, autobind, mobxUtils, CineroomEntityModel, NameValueListModel, IdNameModel, DatePeriodModel,
} from '@nara.platform/accent';
import PunchRuleModel from './vo/PunchRuleModel';


@autobind
@fromDomain
class MemberModel extends CineroomEntityModel {
  //
  zoneId: string = '';
  audienceId: string = '';
  name: string = '';
  projectId: string = '';

  companyCareerYear: number = 0;
  period: DatePeriodModel = new DatePeriodModel();
  punchRule: PunchRuleModel = new PunchRuleModel();


  constructor(audienceId: string, name: string, projectId: string, domain?: CineroomEntityModel) {
    //
    super(domain);

    this.audienceId = audienceId;
    this.name = name;
    this.projectId = projectId;
  }

  static fromDomain(domain: MemberModel): MemberModel {
    //
    const member = new MemberModel(domain.audienceId, domain.name, domain.projectId, domain);

    member.zoneId = domain.zoneId;
    member.companyCareerYear = domain.companyCareerYear;
    member.punchRule = domain.punchRule;
    member.period = domain.period;

    return member;
  }

  static fromDomains(domains: MemberModel[]): MemberModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(member: MemberModel): NameValueListModel {
    //
    return NameValueListModel.fromModel(MemberModel, member, {
      zoneId: String,
      companyCareerYear: String,
      period: JSON,
      punchRule: JSON,
    });
  }

  toIdName(): IdNameModel {
    //
    return new IdNameModel(this.id, this.name);
  }
}

mobxUtils.decorateObservable(MemberModel);
export default MemberModel;
