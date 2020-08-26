
import { fromDomain, CqrsQuery, OffsetModel, LocalDateModel } from '@nara.platform/accent';
import { Moment } from 'moment';
import { ManDayModel } from '~/lib/model';


@fromDomain
class FindManDaysByProjectIdAndDateQuery extends CqrsQuery<ManDayModel> {
  //
  projectId?: string;
  date?: number[];
  offset?: OffsetModel;


  constructor() {
    //
    super(ManDayModel);
  }

  static fromDomain(findManDaysQuery: FindManDaysByProjectIdAndDateQuery): FindManDaysByProjectIdAndDateQuery {
    //
    const query = new FindManDaysByProjectIdAndDateQuery();

    query.setResponse(findManDaysQuery);
    return query;
  }

  static byProjectIdAndDate(projectId: string, date: Moment) {
    //
    const query = new FindManDaysByProjectIdAndDateQuery();

    query.projectId = projectId;
    query.date = LocalDateModel.toDomain(date);

    return query;
  }

  static byProjectIdAndDateAndOffset(projectId: string, date: Moment, offset: OffsetModel) {
    //
    const query = new FindManDaysByProjectIdAndDateQuery();

    query.projectId = projectId;
    query.date = LocalDateModel.toDomain(date);
    query.offset = offset;

    return query;
  }

}

export default FindManDaysByProjectIdAndDateQuery;
