
import { fromDomain, CqrsUserQuery, Offset } from '@nara.platform/accent';
import { YearLeaveModel } from '~/lib/model';


@fromDomain
class FindYearLeavesQuery extends CqrsUserQuery<YearLeaveModel> {
  //
  projectId?: string;
  year?: string;
  offset?: Offset;


  constructor() {
    //
    super(YearLeaveModel);
  }

  static fromDomain(domain: FindYearLeavesQuery): FindYearLeavesQuery {
    //
    const query = new FindYearLeavesQuery();

    query.setResponse(domain);
    return query;
  }

  static byProjectAndYear(projectId: string, year: string, offset?: Offset) {
    //
    const query = new FindYearLeavesQuery();

    query.projectId = projectId;
    query.year = year;
    query.offset = offset;
    return query;
  }
}

export default FindYearLeavesQuery;
