
import { fromDomain, CqrsQuery } from '@nara.platform/accent';
import { Moment } from 'moment';
import { ManDayModel } from '~/lib/model';


@fromDomain
class FindManDaysQuery extends CqrsQuery<ManDayModel> {
  //
  memberId?: string;
  yearMonth?: string;


  constructor() {
    //
    super(ManDayModel);
  }

  static fromDomain(findManDaysQuery: FindManDaysQuery): FindManDaysQuery {
    //
    const query = new FindManDaysQuery();

    query.setResponse(findManDaysQuery);
    return query;
  }

  static byMemberIdAndYearMonth(memberId: string, yearMonth: Moment) {
    //
    const query = new FindManDaysQuery();

    query.memberId = memberId;
    query.yearMonth = yearMonth.format('YYYY-MM');
    return query;
  }

}

export default FindManDaysQuery;
