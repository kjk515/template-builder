
import { fromDomain, CqrsQuery } from '@nara.platform/accent';


@fromDomain
class CountTotalMemberQuery extends CqrsQuery<Number> {
  //
  projectId?: string;


  constructor() {
    //
    super(Number);
  }

  static fromDomain(domain: CountTotalMemberQuery): CountTotalMemberQuery {
    //
    const query = new CountTotalMemberQuery();

    query.setResponse(domain);

    return query;
  }

  static byProjectId(projectId: string) {
    //
    const query = new CountTotalMemberQuery();

    query.projectId = projectId;

    return query;
  }
}

export default CountTotalMemberQuery;
