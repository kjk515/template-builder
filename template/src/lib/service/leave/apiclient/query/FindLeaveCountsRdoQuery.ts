
import { fromDomain, CqrsUserQuery } from '@nara.platform/accent';
import { YearLeaveModel } from '~/lib/model';


@fromDomain
class FindLeaveCountsRdoQuery extends CqrsUserQuery<YearLeaveModel> {
  //
  memberId?: string;
  year?: string;


  constructor() {
    //
    super(YearLeaveModel);
  }

  static fromDomain(domain: FindLeaveCountsRdoQuery): FindLeaveCountsRdoQuery {
    //
    const query = new FindLeaveCountsRdoQuery();

    query.setResponse(domain);
    return query;
  }

  static byMemberAndYear(memberId: string, year: string) {
    //
    const query = new FindLeaveCountsRdoQuery();

    query.memberId = memberId;
    query.year = year;
    return query;
  }
}

export default FindLeaveCountsRdoQuery;
