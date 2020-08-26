
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';

import { Moment } from 'moment';

import { LeaveManDayModel } from '~/lib/model';
import LeaveQueryApi from '../apiclient/LeaveQueryApi';


@autobind
@mobxService
class LeaveManDaysService {
  //
  static readonly instanceName = 'leaveManDaysService';
  static readonly serviceName = 'timecard.leave.leaveManDaysService';
  static instance: LeaveManDaysService;

  private readonly leaveQueryApi: LeaveQueryApi;

  @observable
  leaveManDays: LeaveManDayModel[] = [];

  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance) {
    this.leaveQueryApi = leaveQueryApi;
  }

  @action
  async findLeaveManDaysByProjectIdAndDate(projectId: string, momentDate: Moment): Promise<LeaveManDayModel[]> {
    //
    const leaveManDays = await this.leaveQueryApi.findLeaveManDaysByProjectIdAndDate(projectId, momentDate);

    runInAction(() => this.leaveManDays = leaveManDays);

    return leaveManDays;
  }
}

LeaveManDaysService.instance = new LeaveManDaysService();
export default LeaveManDaysService;
