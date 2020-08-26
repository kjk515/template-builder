
import { fromDomain, CqrsBaseQuery } from '@nara.platform/accent';
import { MemberModel } from '~/lib/model';


@fromDomain
class MemberBaseQuery extends CqrsBaseQuery<MemberModel> {
  //
  id?: string;

  constructor() {
    //
    super(MemberModel);
  }

  static fromDomain(memberBaseQuery: MemberBaseQuery): MemberBaseQuery {
    //
    const query = new MemberBaseQuery();

    query.setResponse(memberBaseQuery);
    return query;
  }

  static by(memberId: string) {
    //
    const query = new MemberBaseQuery();

    query.id = memberId;
    return query;
  }
}

export default MemberBaseQuery;
