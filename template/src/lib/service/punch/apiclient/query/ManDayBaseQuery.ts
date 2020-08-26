
import { fromDomain, CqrsBaseQuery, Offset } from '@nara.platform/accent';
import { ManDayModel } from '~/lib/model';


@fromDomain
class ManDayBaseQuery extends CqrsBaseQuery<ManDayModel> {
  //
  memberId?: string;
  projectDayId?: string;
  projectId?: string;


  constructor() {
    //
    super(ManDayModel);
  }

  static fromDomain(manDayBaseQuery: ManDayBaseQuery): ManDayBaseQuery {
    //
    const query = new ManDayBaseQuery();

    query.setResponse(manDayBaseQuery);
    return query;
  }

  static by(id: string): ManDayBaseQuery {
    //
    const query = new ManDayBaseQuery();

    query.id = id;
    return query;
  }

  static byMember(memberId: string, offset?: Offset) {
    //
    const query = new ManDayBaseQuery();

    query.memberId = memberId;
    query.offset = offset;
    return query;
  }

  static byProjectDay(projectDayId: string, offset?: Offset) {
    //
    const query = new ManDayBaseQuery();

    query.projectDayId = projectDayId;
    query.offset = offset;
    return query;
  }
}

export default ManDayBaseQuery;
