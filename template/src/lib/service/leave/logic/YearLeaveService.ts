
import { autobind, mobxService } from '@nara.platform/accent';
import { action, observable, runInAction } from 'mobx';
import { YearLeaveModel } from '~/lib/model';
import LeaveQueryApi from '../apiclient/LeaveQueryApi';
import LeaveFlowApi from '../apiclient/LeaveFlowApi';


@autobind
@mobxService
class YearLeaveService {
  //
  static readonly instanceName = 'yearLeaveService';
  static readonly serviceName = 'timecard.leave.yearLeaveService';
  static instance: YearLeaveService;

  private readonly leaveQueryApi: LeaveQueryApi;
  private readonly leaveCommandApi: LeaveFlowApi;

  @observable
  yearLeave: YearLeaveModel | null = null;

  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance, leaveCommandApi: LeaveFlowApi = LeaveFlowApi.instance) {
    //
    this.leaveQueryApi = leaveQueryApi;
    this.leaveCommandApi = leaveCommandApi;
  }

  @action
  async findYearLeave(memberId: string, year: string) {
    //
    const yearLeave = await this.leaveQueryApi.findYearLeaveByMemberIdAndYear(memberId, year);

    runInAction(() => this.yearLeave = yearLeave);
    return yearLeave;
  }
}

YearLeaveService.instance = new YearLeaveService();
export default YearLeaveService;
