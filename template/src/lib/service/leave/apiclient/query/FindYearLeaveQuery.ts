
import { fromDomain, CqrsUserQuery } from '@nara.platform/accent';
import { YearLeaveModel } from '~/lib/model';


@fromDomain
class FindYearLeaveQuery extends CqrsUserQuery<YearLeaveModel> {
  //
  memberId?: string;
  year?: string;


  constructor() {
    //
    super(YearLeaveModel);
  }

  static fromDomain(domain: FindYearLeaveQuery): FindYearLeaveQuery {
    //
    const query = new FindYearLeaveQuery();

    query.setResponse(domain);
    return query;
  }

  static byMemberAndYear(memberId: string, year: string) {
    //
    const query = new FindYearLeaveQuery();

    query.memberId = memberId;
    query.year = year;
    return query;
  }
}

export default FindYearLeaveQuery;
