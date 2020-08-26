
import { fromDomain, CqrsQuery, Offset } from '@nara.platform/accent';
import { Moment } from 'moment';
import { ManMonthModel } from '~/lib/model';


@fromDomain
class FindManMonthsQuery extends CqrsQuery<ManMonthModel> {
  //
  projectId?: string;
  yearMonth?: string;
  offset?: Offset;


  constructor() {
    //
    super(ManMonthModel);
  }

  static fromDomain(findManMonthsQuery: FindManMonthsQuery): FindManMonthsQuery {
    //
    const query = new FindManMonthsQuery();

    query.setResponse(findManMonthsQuery);

    return query;
  }

  static byProjectIdAndYearMonth(memberId: string, yearMonth: Moment) {
    //
    const query = new FindManMonthsQuery();

    query.projectId = memberId;
    query.yearMonth = yearMonth.format('YYYY-MM');

    return query;
  }

  static byProjectIdAndYearMonthAndOffset(memberId: string, yearMonth: Moment, offset: Offset) {
    //
    const query = new FindManMonthsQuery();

    query.projectId = memberId;
    query.yearMonth = yearMonth.format('YYYY-MM');
    query.offset = offset;

    return query;
  }
}

export default FindManMonthsQuery;
