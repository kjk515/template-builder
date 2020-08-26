
import { fromDomain, CqrsQuery } from '@nara.platform/accent';
import { MemberModel } from '~/lib/model';


@fromDomain
class FindMemberQuery extends CqrsQuery<MemberModel> {
  //
  projectId?: string;


  constructor() {
    //
    super(MemberModel);
  }

  static fromDomain(findMemberQuery: FindMemberQuery): FindMemberQuery {
    //
    const query = new FindMemberQuery();

    query.setResponse(findMemberQuery);
    return query;
  }

  static byProjectId(projectId: string) {
    //
    const query = new FindMemberQuery();

    query.projectId = projectId;
    return query;
  }
}

export default FindMemberQuery;
