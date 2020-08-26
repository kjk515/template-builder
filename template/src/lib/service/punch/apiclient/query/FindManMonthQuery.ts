
import { fromDomain, CqrsQuery } from '@nara.platform/accent';
import { Moment } from 'moment';
import { ManMonthModel } from '~/lib/model';


@fromDomain
class FindManMonthQuery extends CqrsQuery<ManMonthModel> {
  //
  projectId?: string;
  memberId?: string;
  yearMonth?: string;


  constructor() {
    //
    super(ManMonthModel);
  }

  static fromDomain(findManMonthQuery: FindManMonthQuery): FindManMonthQuery {
    //
    const query = new FindManMonthQuery();

    query.setResponse(findManMonthQuery);

    return query;
  }

  static byProjectIdAndYearMonth(projectId: string, yearMonth: Moment) {
    //
    const query = new FindManMonthQuery();

    query.projectId = projectId;
    query.yearMonth = yearMonth.format('YYYY-MM');

    return query;
  }

  static byMemberIdAndYearMonth(memberId: string, yearMonth: Moment) {
    //
    const query = new FindManMonthQuery();

    query.memberId = memberId;
    query.yearMonth = yearMonth.format('YYYY-MM');

    return query;
  }
}

export default FindManMonthQuery;
