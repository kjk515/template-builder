
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';

import { LeaveCountsRdo } from '~/lib/model';
import LeaveQueryApi from '../apiclient/LeaveQueryApi';


@autobind
@mobxService
class LeaveCountsRdoService {
  //
  static readonly instanceName = 'leaveCountsRdoService';
  static readonly serviceName = 'timecard.leave.leaveCountsRdoService';
  static instance: LeaveCountsRdoService;

  private readonly leaveQueryApi: LeaveQueryApi;

  @observable
  leaveSummary: LeaveCountsRdo | null = null;

  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance) {
    this.leaveQueryApi = leaveQueryApi;
  }

  @action
  async findLeaveSummary(memberId: string, year: string): Promise<LeaveCountsRdo> {
    //
    const leaveSummary = await this.leaveQueryApi.findLeaveCountsRdoByMemberIdAndYear(memberId, year);

    runInAction(() => this.leaveSummary = leaveSummary);
    return leaveSummary;
  }
}

LeaveCountsRdoService.instance = new LeaveCountsRdoService();
export default LeaveCountsRdoService;
