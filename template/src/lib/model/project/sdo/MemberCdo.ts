
import { autobind, DatePeriodModel } from '@nara.platform/accent';
import MemberModel from '../MemberModel';


@autobind
class MemberCdo {
  //
  zoneId: string = '';
  audienceId: string = '';
  name: string = '';
  companyCareerYear: number = 0;
  period: DatePeriodModel = new DatePeriodModel();
  projectId: string = '';


  static fromModel(member: MemberModel): MemberCdo {
    //
    return {
      zoneId: member.zoneId,
      audienceId: member.audienceId,
      name: member.name,
      projectId: member.projectId,
      companyCareerYear: member.companyCareerYear,
      period: member.period,
    };
  }
}

export default MemberCdo;
