
import { fromDomain, CqrsBaseQuery, Offset } from '@nara.platform/accent';
import { LeaveModel } from '~/lib/model';


@fromDomain
class LeaveBaseQuery extends CqrsBaseQuery<LeaveModel> {
  //
  id?: string;
  projectId?: string;
  yearMonth?: string;
  memberId?: string;
  year?: string;
  offset?: Offset;


  constructor() {
    //
    super(LeaveBaseQuery);
  }

  static fromDomain(domain: LeaveBaseQuery): LeaveBaseQuery {
    //
    const query = new LeaveBaseQuery();

    query.setResponse(domain);
    return query;
  }

  static byId(id: string) {
    //
    const query = new LeaveBaseQuery();

    query.id = id;
    return query;
  }

  static byProjectAndYearMonth(projectId: string, yearMonth: string, offset?: Offset) {
    //
    const query = new LeaveBaseQuery();

    query.projectId = projectId;
    query.yearMonth = yearMonth;
    query.offset = offset;
    return query;
  }

  static byMemberAndYear(memberId: string, year: string, offset?: Offset) {
    //
    const query = new LeaveBaseQuery();

    query.memberId = memberId;
    query.year = year;
    query.offset = offset;
    return query;
  }
}

export default LeaveBaseQuery;
