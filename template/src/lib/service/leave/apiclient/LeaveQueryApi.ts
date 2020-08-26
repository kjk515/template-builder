
import { ApiClient, Offset, OffsetModel, OffsetElementList, OffsetElementListModel } from '@nara.platform/accent';
import { Moment } from 'moment';

import { YearLeaveModel, LeaveCountsRdo, LeavePlanModel, LeaveTeamMonthModel, LeaveModel, LeaveManDayModel, LeaveManMonthRdo } from '~/lib/model';
import {
  FindYearLeavesQuery,
  FindLeaveCountsRdoQuery,
  LeavePlanBaseQuery,
  FindLeaveTeamMonthQuery,
  LeaveBaseQuery,
  FindLeaveManMonthsQuery,
  FindYearLeaveQuery,
  FindLeaveManDaysQuery,
} from './query';


class LeaveQueryApi {
  //
  static instance: LeaveQueryApi;

  private readonly client = new ApiClient('/api/timecard/leave-', {
    resDataName: 'queryResult',
  });


  /* Base ----------------------------------------------------------------------------------------------------------- */

  async findLeavePlanById(leavePlanId: string): Promise<LeavePlanModel | null> {
    //
    const leavePlanBaseQuery = LeavePlanBaseQuery.byId(leavePlanId);

    return this.client.postNullable<LeavePlanModel>(LeavePlanModel, 'base-query/leave-plan/query', leavePlanBaseQuery);
  }

  async findLeaveById(leaveId: string): Promise<LeaveModel | null> {
    //
    const leaveBaseQuery = LeaveBaseQuery.byId(leaveId);

    return this.client.postNullable<LeaveModel>(LeaveModel, 'base-query/leave/query', leaveBaseQuery);
  }

  /* User - Custom -------------------------------------------------------------------------------------------------- */

  async findLeaveManDaysByProjectIdAndDate(projectId: string, date: Moment): Promise<LeaveManDayModel[]> {
    //
    const query = FindLeaveManDaysQuery.byProjectIdAndDate(projectId, date);

    return this.client.postArray<LeaveManDayModel>(LeaveManDayModel, 'custom-query/leave-man-day/find-leave-man-days-by-project-id-and-date', query);
  }

  async findYearLeavesByProjectIdAndYear(projectId: string, year: string, offset: Offset): Promise<OffsetElementList<YearLeaveModel>> {
    //
    const query = FindYearLeavesQuery.byProjectAndYear(projectId, year, offset);

    return this.client.postNotNull<OffsetElementList<YearLeaveModel>>(
      OffsetElementListModel,
      'custom-query/year-leave/find-year-leaves-by-project-id-and-year',
      query
    );
  }

  async findYearLeaveByMemberIdAndYear(memberId: string, year: string): Promise<YearLeaveModel> {
    //
    const query = FindYearLeaveQuery.byMemberAndYear(memberId, year);

    return this.client.postNotNull<YearLeaveModel>(YearLeaveModel, 'custom-query/year-leave/find-year-leave-by-member-id-and-year', query);
  }

  async findLeavePlansByProjectIdAndYearMonth(projectId: string, yearMonth: string, offset: Offset): Promise<OffsetElementList<LeavePlanModel>> {
    //
    const leavePlanBaseQuery = LeavePlanBaseQuery.byProjectAndYearMonth(projectId, yearMonth, offset);

    delete leavePlanBaseQuery.responseName;
    delete leavePlanBaseQuery.failureMessageName;

    return this.client.postNotNull<OffsetElementList<LeavePlanModel>>(
      OffsetElementListModel,
      'custom-query/leave-plan/find-leave-plans-by-project-id-and-year-month',
      leavePlanBaseQuery
    );
  }

  async findLeavesByProjectIdAndYearMonth(projectId: string, yearMonth: string, offset: Offset): Promise<OffsetElementList<LeaveModel>> {
    //
    const leaveBaseQuery = LeaveBaseQuery.byProjectAndYearMonth(projectId, yearMonth, offset);

    return this.client.postNotNull<OffsetElementList<LeaveModel>>(
      OffsetElementListModel,
      'custom-query/leave/find-leaves-by-project-id-and-year-month',
      leaveBaseQuery
    );
  }

  async findLeavePlansByMemberIdAndYear(memberId: string, year: string, offset: Offset): Promise<LeavePlanModel[]> {
    //
    const leavePlanBaseQuery = LeavePlanBaseQuery.byMemberAndYear(memberId, year, offset);

    return this.client.postArray<LeavePlanModel>(LeavePlanModel, 'custom-query/leave-plan/find-leave-plans-by-member-id-and-year', leavePlanBaseQuery);
  }

  async findLeavesByMemberIdAndYear(memberId: string, year: string, offset: Offset): Promise<LeaveModel[]> {
    //
    const leaveBaseQuery = LeaveBaseQuery.byMemberAndYear(memberId, year, offset);

    return this.client.postArray<LeaveModel>(LeaveModel, 'custom-query/leave/find-leaves-by-member-id-and-year', leaveBaseQuery);
  }

  async findLeaveCountsRdoByMemberIdAndYear(memberId: string, year: string): Promise<LeaveCountsRdo> {
    //
    const query = FindLeaveCountsRdoQuery.byMemberAndYear(memberId, year);

    return this.client.postNotNull<LeaveCountsRdo>(LeaveCountsRdo, 'custom-query/leave-counts-rdo/find-leave-counts-by-member-id-and-year', query);
  }

  async findLeaveTeamMonthByProjectIdAndYearMonth(projectId: string, date: Moment): Promise<LeaveTeamMonthModel | null> {
    //
    const query = FindLeaveTeamMonthQuery.byProjectIdAndYearMonth(projectId, date);

    return this.client.postNullable<LeaveTeamMonthModel>(LeaveTeamMonthModel, 'custom-query/leave-team-month/find-leave-team-month-by-project-id-and-year-month', query);
  }

  async findLeaveManMonthRdosByProjectIdAndYearMonth(
    projectId: string,
    date: Moment,
    offset: OffsetModel
  ): Promise<OffsetElementList<LeaveManMonthRdo>> {
    //
    const query = FindLeaveManMonthsQuery.byProjectIdAndYearMonthAndOffset(projectId, date, offset);

    return this.client.postNotNull<OffsetElementList<LeaveManMonthRdo>>(
      OffsetElementListModel,
      'custom-query/leave-man-month/find-leave-man-month-rdos-by-project-id-and-year-month',
      query,
    );
  }
}

LeaveQueryApi.instance = new LeaveQueryApi();
export default LeaveQueryApi;
