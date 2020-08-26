
import { action, observable, runInAction } from 'mobx';
import { autobind, mobxService, OffsetModel } from '@nara.platform/accent';

import { Moment } from 'moment';
import { LeaveManMonthRdo } from '~/lib/model';
import LeaveQueryApi from '../apiclient/LeaveQueryApi';


@autobind
@mobxService
class LeaveManMonthsService {
  //
  static readonly instanceName = 'leaveManMonthsService';
  static readonly serviceName = 'timecard.leave.leaveService';
  static instance: LeaveManMonthsService;

  private readonly leaveQueryApi: LeaveQueryApi;

  @observable
  leaveManMonthRdos: LeaveManMonthRdo[] = [];

  @observable
  totalCount: number = 0;


  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance) {
    //
    this.leaveQueryApi = leaveQueryApi;
  }

  @action
  async findLeaveManMonthsByProjectIdAndYearMonth(projectId: string, momentDate: Moment, offset: OffsetModel): Promise<LeaveManMonthRdo[]> {
    //
    const leaveManMonthRdos = await this.leaveQueryApi.findLeaveManMonthRdosByProjectIdAndYearMonth(projectId, momentDate, offset);

    runInAction(() => {
      this.leaveManMonthRdos = LeaveManMonthRdo.fromDomains(leaveManMonthRdos.results);
      this.totalCount = leaveManMonthRdos.totalCount;
    });

    return leaveManMonthRdos.results;
  }
}

LeaveManMonthsService.instance = new LeaveManMonthsService();
export default LeaveManMonthsService;
