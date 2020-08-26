
import { autobind, mobxService, OffsetModel } from '@nara.platform/accent';
import { action, observable, runInAction } from 'mobx';

import { YearLeaveModel, YearLeaveUdo } from '~/lib/model';
import LeaveQueryApi from '../apiclient/LeaveQueryApi';
import LeaveFlowApi from '../apiclient/LeaveFlowApi';


@autobind
@mobxService
class YearLeavesService {
  //
  static readonly instanceName = 'yearLeavesService';
  static readonly serviceName = 'timecard.leave.yearLeavesService';
  static instance: YearLeavesService;

  private readonly leaveQueryApi: LeaveQueryApi;
  private readonly leaveCommandApi: LeaveFlowApi;

  @observable
  yearLeaves: YearLeaveModel[] = [];

  @observable
  totalCount: number = 0;


  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance, leaveCommandApi: LeaveFlowApi = LeaveFlowApi.instance) {
    //
    this.leaveQueryApi = leaveQueryApi;
    this.leaveCommandApi = leaveCommandApi;
  }

  @action
  async findYearLeavesByYear(projectId: string, year: string, offset: OffsetModel): Promise<(YearLeaveModel | null)[]> {
    //
    const yearLeaveOffsetElements = await this.leaveQueryApi.findYearLeavesByProjectIdAndYear(projectId, year, offset);

    runInAction(() => {
      this.yearLeaves = YearLeaveModel.fromDomains(yearLeaveOffsetElements.results);
      this.totalCount = yearLeaveOffsetElements.totalCount;
    });

    return yearLeaveOffsetElements.results;
  }

  @action
  setPermitCounts(index: number, type: 'month' | 'year' | 'added', value: number) {
    //
    this.yearLeaves[index].permitCounts = { ...this.yearLeaves[index].permitCounts, [type]: value };
  }

  modifyYearLeaves() {
    //
    return this.leaveCommandApi.modifyYearLeaves(YearLeaveUdo.fromModels(this.yearLeaves));
  }
}

YearLeavesService.instance = new YearLeavesService();
export default YearLeavesService;
