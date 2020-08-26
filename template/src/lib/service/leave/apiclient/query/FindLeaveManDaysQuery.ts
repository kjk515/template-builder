
import { fromDomain, CqrsQuery } from '@nara.platform/accent';
import { Moment } from 'moment';
import { LeaveManDayModel } from '~/lib/model';


@fromDomain
class FindLeaveManDaysQuery extends CqrsQuery<LeaveManDayModel> {
  //
  projectId?: string;
  date?: number[];


  constructor() {
    //
    super(LeaveManDayModel);
  }

  static fromDomain(domain: FindLeaveManDaysQuery): FindLeaveManDaysQuery {
    //
    const query = new FindLeaveManDaysQuery();

    query.setResponse(domain);

    return query;
  }

  static byProjectIdAndDate(projectId: string, date: Moment) {
    //
    const query = new FindLeaveManDaysQuery();

    query.projectId = projectId;
    query.date = [date.year(), date.month() + 1, date.date()];

    return query;
  }
}

export default FindLeaveManDaysQuery;
