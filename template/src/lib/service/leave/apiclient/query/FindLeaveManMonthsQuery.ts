
import { fromDomain, CqrsQuery, Offset } from '@nara.platform/accent';
import { Moment } from 'moment';
import { LeaveManMonthRdo } from '~/lib/model';


@fromDomain
class FindLeaveManMonthsQuery extends CqrsQuery<LeaveManMonthRdo> {
  //
  projectId?: string;
  yearMonth?: string;
  offset?: Offset;


  constructor() {
    //
    super(LeaveManMonthRdo);
  }

  static fromDomain(domain: FindLeaveManMonthsQuery): FindLeaveManMonthsQuery {
    //
    const query = new FindLeaveManMonthsQuery();

    query.setResponse(domain);

    return query;
  }

  static byProjectIdAndYearMonth(projectId: string, date: Moment) {
    //
    const query = new FindLeaveManMonthsQuery();

    query.projectId = projectId;
    query.yearMonth = date.format('YYYY-MM');

    return query;
  }

  static byProjectIdAndYearMonthAndOffset(projectId: string, date: Moment, offset: Offset) {
    //
    const query = new FindLeaveManMonthsQuery();

    query.projectId = projectId;
    query.yearMonth = date.format('YYYY-MM');
    query.offset = offset;

    return query;
  }
}

export default FindLeaveManMonthsQuery;
