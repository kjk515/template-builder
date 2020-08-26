
import { ApiClient, Offset, OffsetModel, OffsetElementList, OffsetElementListModel } from '@nara.platform/accent';
import { Moment } from 'moment';

import { ManDayModel, ManMonthModel } from '~/lib/model';
import {
  ManDayBaseQuery,
  FindManDayQuery,
  FindManDaysQuery,
  FindManMonthQuery,
  FindManMonthsQuery,
  FindManDaysByProjectIdAndDateQuery,
} from './query';


class ManDayQueryApi {
  //
  static instance: ManDayQueryApi;

  private readonly client = new ApiClient('/api/timecard/punch-', {
    resDataName: 'queryResult',
  });


  /* BaseQuery ------------------------------------------------------------------------------------------------------ */

  async findManDay(manDayId: string): Promise<ManDayModel> {
    //

    return this.baseQueryModel(ManDayBaseQuery.by(manDayId));
  }

  async findManDaysByMember(memberId: string, offset?: Offset): Promise<ManDayModel[]> {
    //
    return this.baseQueryModels(ManDayBaseQuery.byMember(memberId, offset));
  }

  async findManDaysByProjectDay(projectDayId: string, offset?: Offset): Promise<ManDayModel[]> {
    //
    return this.baseQueryModels(ManDayBaseQuery.byProjectDay(projectDayId, offset));
  }

  async baseQueryModel(manDayBaseQuery: ManDayBaseQuery): Promise<ManDayModel> {
    //
    return this.client.postNotNull<ManDayModel>(ManDayModel, 'base-query/man-day/query', manDayBaseQuery);
  }

  async baseQueryModels(manDayBaseQuery: ManDayBaseQuery): Promise<ManDayModel[]> {
    //
    return this.client.postArray<ManDayModel>(ManDayModel, 'base-query/man-days/list-query', manDayBaseQuery);
  }

  /* UserQuery ------------------------------------------------------------------------------------------------------ */

  async findManDayByMemberIdAndDate(memberId: string, date: Moment): Promise<ManDayModel> {
    //
    const query = FindManDayQuery.byMemberIdAndDate(memberId, date);

    return this.client.postNotNull<ManDayModel>(ManDayModel, 'custom-query/man-day/find-man-day-by-member-id-and-date', query);
  }

  async findManDaysByMemberIdAndYearMonth(memberId: string, date: Moment): Promise<ManDayModel[]> {
    //
    const query = FindManDaysQuery.byMemberIdAndYearMonth(memberId, date);

    return this.client.postArray<ManDayModel>(ManDayModel, 'custom-query/man-day/find-man-days-member-id-and-year-month', query);
  }

  async findManMonthByMemberIdAndYearMonth(memberId: string, date: Moment): Promise<ManMonthModel> {
    //
    const query = FindManMonthQuery.byMemberIdAndYearMonth(memberId, date);

    return this.client.postNotNull<ManMonthModel>(ManMonthModel, 'custom-query/man-month/find-man-month-by-member-id-and-year-month', query);
  }

  async findManDaysByProjectIdAndDateAndOffset(projectId: string, date: Moment, offset: OffsetModel): Promise<OffsetElementList<ManDayModel>> {
    //
    const query = FindManDaysByProjectIdAndDateQuery.byProjectIdAndDateAndOffset(projectId, date, offset);

    return this.client.postNotNull<OffsetElementList<ManDayModel>>(
      OffsetElementListModel,
      'custom-query/man-day/find-man-days-by-project-id-and-date',
      query);
  }

  async findManMonthsByProjectIdAndYearMonth(projectId: string, date: Moment): Promise<OffsetElementList<ManMonthModel>> {
    //
    const query = FindManMonthsQuery.byProjectIdAndYearMonth(projectId, date);

    return this.findManMonths(query);
  }

  async findManMonthsByProjectIdAndYearMonthAndOffset(projectId: string, date: Moment, offset: Offset): Promise<OffsetElementList<ManMonthModel>> {
    //
    const query = FindManMonthsQuery.byProjectIdAndYearMonthAndOffset(projectId, date, offset);

    return this.findManMonths(query);
  }

  async findManMonths(findManMonthsQuery: FindManMonthsQuery): Promise<OffsetElementList<ManMonthModel>> {
    //
    return this.client.postNotNull<OffsetElementList<ManMonthModel>>(OffsetElementListModel, 'custom-query/man-month/find-man-months-by-project-id-and-year-month', findManMonthsQuery);
  }
}

ManDayQueryApi.instance = new ManDayQueryApi();
export default ManDayQueryApi;
