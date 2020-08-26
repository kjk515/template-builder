
import { fromDomain, CqrsBaseQuery, Offset } from '@nara.platform/accent';
import { LeavePlanModel } from '~/lib/model';


@fromDomain
class LeavePlanBaseQuery extends CqrsBaseQuery<LeavePlanModel> {
  //
  id?: string;
  projectId?: string;
  yearMonth?: string;
  memberId?: string;
  year?: string;
  offset?: Offset;


  constructor() {
    //
    super(LeavePlanBaseQuery);
  }

  static fromDomain(domain: LeavePlanBaseQuery): LeavePlanBaseQuery {
    //
    const query = new LeavePlanBaseQuery();

    query.setResponse(domain);
    return query;
  }

  static byId(id: string) {
    //
    const query = new LeavePlanBaseQuery();

    query.id = id;
    return query;
  }

  static byProjectAndYearMonth(projectId: string, yearMonth: string, offset?: Offset) {
    //
    const query = new LeavePlanBaseQuery();

    query.projectId = projectId;
    query.yearMonth = yearMonth;
    query.offset = offset;
    return query;
  }

  static byMemberAndYear(memberId: string, year: string, offset?: Offset) {
    //
    const query = new LeavePlanBaseQuery();

    query.memberId = memberId;
    query.year = year;
    query.offset = offset;
    return query;
  }

}

export default LeavePlanBaseQuery;
