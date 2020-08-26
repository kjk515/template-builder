
import { action, computed, observable, runInAction } from 'mobx';
import { autobind, mobxService, NotInstantiatedException, OffsetModel, IdNameModel } from '@nara.platform/accent';

import {
  ChangeRequestModel,
  LeaveModel,
  LeavePlanCdo,
  LeavePlanModel,
  MemberModel,
  TimePeriodModel,
  LeavePlanState,
} from '~/lib/model';
import LeaveQueryApi from '../apiclient/LeaveQueryApi';
import LeaveFlowApi from '../apiclient/LeaveFlowApi';


@autobind
@mobxService
class LeaveService {
  //
  static readonly instanceName = 'leaveService';
  static readonly serviceName = 'timecard.leave.leaveService';
  static instance: LeaveService;

  private readonly leaveQueryApi: LeaveQueryApi;
  private readonly leaveCommandApi: LeaveFlowApi;

  @observable
  _leaves: (LeavePlanModel | LeaveModel)[] = [];

  @observable
  leavePlan: LeavePlanModel | null = null;

  @observable
  leave: LeaveModel | null = null;

  @observable
  editingAdjustment: boolean = false;

  @observable
  totalCount: number = 0;


  constructor(leaveQueryApi: LeaveQueryApi = LeaveQueryApi.instance, leaveCommandApi: LeaveFlowApi = LeaveFlowApi.instance) {
    this.leaveQueryApi = leaveQueryApi;
    this.leaveCommandApi = leaveCommandApi;
  }

  @computed
  get leaves() {
    //
    return this._leaves.filter(leave => leave.state !== LeavePlanState.Finished);
  }

  @action
  async findLeavePlan(leavePlanId: string) {
    //
    const leavePlan = await this.leaveQueryApi.findLeavePlanById(leavePlanId);

    runInAction(() => this.leavePlan = leavePlan);
    return leavePlan;
  }

  @action
  initLeavePlan(yearLeaveId: string, projectId: string, member: MemberModel, registrant: MemberModel) {
    //
    const leavePlan = new LeavePlanModel(yearLeaveId, projectId, member.id, registrant.toIdName());

    leavePlan.memberName = member.name;

    this.leavePlan = leavePlan;
  }

  @action
  setLeaveProp(name: keyof LeavePlanModel, value: any) {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.setLeaveProp', 'leavePlan is null');
    }

    (this.leavePlan as any)[name] = value;
  }

  @action
  setLeaveTimePeriodProp(name: keyof TimePeriodModel, value: any) {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.setLeaveProp', 'leavePlan is null');
    }

    if (!this.leavePlan.halfOffTimePeriod) {
      this.leavePlan.halfOffTimePeriod = new TimePeriodModel();
    }

    this.leavePlan.halfOffTimePeriod[name] = value;
  }

  @action
  setChangeRequestsProp(index: number, name: keyof ChangeRequestModel, value: any) {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.setChangeRequestsProp', 'leavePlan is null');
    }

    (this.leavePlan.changeRequests[index] as any)[name] = value;
  }

  @action
  initChangeRequest(requester: MemberModel) {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.initChangeRequest', 'leavePlan is null');
    }

    this.leavePlan.changeRequests[this.leavePlan.changeRequests.length] = new ChangeRequestModel(new IdNameModel(requester.id, requester.name), true);
  }

  @action
  async findLeavesByMember(memberId: string, year: string, offset: OffsetModel, isPlan?: boolean) {
    //
    let leaves: (LeavePlanModel | LeaveModel)[] = [];

    if (isPlan) {
      leaves = await this.leaveQueryApi.findLeavePlansByMemberIdAndYear(memberId, year, offset);
    }
    else {
      leaves = await this.leaveQueryApi.findLeavesByMemberIdAndYear(memberId, year, offset);
    }

    runInAction(() => this._leaves = leaves);
    return leaves;
  }

  @action
  async findLeavesByProject(projectId: string, yearMonth: string, offset: OffsetModel, isPlan?: boolean) {
    //
    let leavePlans: LeavePlanModel[] = [];
    let leaves: LeaveModel[] = [];

    if (isPlan) {
      const leaveOffsetElements = await this.leaveQueryApi.findLeavePlansByProjectIdAndYearMonth(projectId, yearMonth, offset);

      leavePlans = LeavePlanModel.fromDomains(leaveOffsetElements.results);

      runInAction(() => {
        this._leaves = leavePlans;
        this.totalCount = leaveOffsetElements.totalCount;
      });
    }
    else {
      const leaveOffsetElements = await this.leaveQueryApi.findLeavesByProjectIdAndYearMonth(projectId, yearMonth, offset);

      leaves = LeaveModel.fromDomains(leaveOffsetElements.results);

      runInAction(() => {
        this._leaves = leaves;
        this.totalCount = leaveOffsetElements.totalCount;
      });
    }


    return leaves;
  }

  @action
  registerLeavePlan() {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.registerLeavePlan', 'leavePlan is null');
    }

    return this.leaveCommandApi.registerLeavePlan(LeavePlanCdo.fromModel(this.leavePlan));
  }

  cancelLeavePlan() {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.cancelLeavePlan', 'leavePlan is null');
    }

    return this.leaveCommandApi.cancelLeavePlan(this.leavePlan.id);
  }

  modifyLeavePlanByAdjustment() {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.registerLeavePlan', 'leavePlan is null');
    }

    return this.leaveCommandApi.modifyLeavePlanByAdjustment(this.leavePlan.id);
  }

  @action
  modifyLeavePlan() {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.registerLeavePlan', 'leavePlan is null');
    }

    return this.leaveCommandApi.modifyLeavePlan(this.leavePlan.id, LeavePlanModel.asNameValues(this.leavePlan));
  }

  @action
  modifyLeavePlanPeriod() {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.registerLeavePlan', 'leavePlan is null');
    }

    return this.leaveCommandApi.modifyLeavePlanPeriod(this.leavePlan.id, LeavePlanModel.asNameValues(this.leavePlan));
  }


  doLeavePlan() {
    //
    if (!this.leavePlan) {
      throw new NotInstantiatedException('LeaveService.registerLeavePlan', 'leavePlan is null');
    }

    return this.leaveCommandApi.doLeavePlan(this.leavePlan.id);
  }

  @action
  async findLeave(leaveId: string) {
    //
    const leave = await this.leaveQueryApi.findLeaveById(leaveId);

    runInAction(() => this.leave = leave);
    return leave;
  }

  finishLeave(leaveId?: string) {
    //
    if (leaveId) {
      return this.leaveCommandApi.finishLeave(leaveId);
    }
    else {
      if (!this.leave) {
        throw new NotInstantiatedException('LeaveService.finishLeave', 'leave is null');
      }
      return this.leaveCommandApi.finishLeave(this.leave.id);
    }
  }

  cancelLeave() {
    //
    if (!this.leave) {
      throw new NotInstantiatedException('LeaveService.cancelLeave', 'leave is null');
    }

    return this.leaveCommandApi.cancelLeave(this.leave.id);
  }

  @action
  setEditingAdjustment(editingAdjustment: boolean) {
    //
    this.editingAdjustment = editingAdjustment;
  }
}

LeaveService.instance = new LeaveService();
export default LeaveService;
