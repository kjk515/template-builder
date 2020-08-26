
import { fromDomain, CqrsBaseQuery, Offset } from '@nara.platform/accent';
import { MemberModel } from '~/lib/model';


@fromDomain
class MembersBaseQuery extends CqrsBaseQuery<MemberModel> {
  //
  projectId?: string;
  audienceId?: string;
  offset?: Offset;


  constructor() {
    //
    super(MemberModel);
  }

  static fromDomain(memberBaseQuery: MembersBaseQuery): MembersBaseQuery {
    //
    const query = new MembersBaseQuery();

    query.setResponse(memberBaseQuery);
    return query;
  }

  static byAudienceId(audienceId: string) {
    //
    const query = new MembersBaseQuery();

    query.audienceId = audienceId;
    return query;
  }

  static byProjectId(projectId: string): MembersBaseQuery {
    const query = new MembersBaseQuery();

    query.projectId = projectId;
    return query;
  }

  static byAudienceIdAndProjectId(audienceId: string, projectId: string) {
    //
    const query = new MembersBaseQuery();

    query.audienceId = audienceId;
    query.projectId = projectId;

    return query;
  }
}

export default MembersBaseQuery;
