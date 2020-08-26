
import { fromDomain, CqrsQuery } from '@nara.platform/accent';
import { Moment } from 'moment';
import { LeaveManMonthRdo, LeaveTeamMonthModel } from '~/lib/model';


@fromDomain
class FindLeaveTeamMonthQuery extends CqrsQuery<LeaveManMonthRdo> {
  //
  projectId?: string;
  yearMonth?: string;


  constructor() {
    //
    super(LeaveTeamMonthModel);
  }

  static fromDomain(domain: FindLeaveTeamMonthQuery): FindLeaveTeamMonthQuery {
    //
    const query = new FindLeaveTeamMonthQuery();

    query.setResponse(domain);
    return query;
  }

  static byProjectIdAndYearMonth(projectId: string, date: Moment) {
    //
    const query = new FindLeaveTeamMonthQuery();

    query.projectId = projectId;
    query.yearMonth = date.format('YYYY-MM');

    return query;
  }

}

export default FindLeaveTeamMonthQuery;
