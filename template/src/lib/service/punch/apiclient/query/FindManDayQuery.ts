
import { fromDomain, CqrsQuery } from '@nara.platform/accent';
import { Moment } from 'moment';
import { ManDayModel } from '~/lib/model';


@fromDomain
class FindManDayQuery extends CqrsQuery<ManDayModel> {
  //
  memberId?: string;
  date?: string;


  constructor() {
    //
    super(ManDayModel);
  }

  static fromDomain(domain: FindManDayQuery): FindManDayQuery {
    //
    const query = new FindManDayQuery();

    query.setResponse(domain);
    return query;
  }

  static byMemberIdAndDate(memberId: string, date: Moment) {
    //
    const query = new FindManDayQuery();

    query.memberId = memberId;
    query.date = date.format('YYYY-MM-DD');  // TODO: 서버랑 통신 테스트 후 타입 픽스
    return query;
  }
}

export default FindManDayQuery;
