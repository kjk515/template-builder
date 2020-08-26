
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';
import { Moment } from 'moment';

import LeaveQueryApi from '../apiclient/LeaveQueryApi';
import LeaveTeamMonthModel from '~/lib/model/leave/query/LeaveTeamMonthModel';


@autobind
@mobxService
class LeaveTeamMonthService {
  //
  static readonly instanceName = 'leaveTeamMonthService';
  static readonly serviceName = 'timecard.leave.leaveTeamMonthService';
  static instance: LeaveTeamMonthService;

  private readonly leaveQueryApi: LeaveQueryApi;

  @observable
  leaveTeamMonth: LeaveTeamMonthModel | null = null;

  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance) {
    this.leaveQueryApi = leaveQueryApi;
  }

  @action
  async findLeaveTeamMonthByProjectIdAndYearMonth(projectId: string, momentDate: Moment): Promise<LeaveTeamMonthModel | null> {
    //
    const leaveTeamMonth = await this.leaveQueryApi.findLeaveTeamMonthByProjectIdAndYearMonth(projectId, momentDate);

    runInAction(() => this.leaveTeamMonth = leaveTeamMonth);

    return leaveTeamMonth;
  }
}

LeaveTeamMonthService.instance = new LeaveTeamMonthService();
export default LeaveTeamMonthService;
