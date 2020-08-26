
import { ApiClient, CommandResponse, NameValueListModel } from '@nara.platform/accent';

import {
  ModifyYearLeavesCommand,
  RegisterLeavePlanCommand,
  CancelLeavePlanCommand,
  DoLeavePlanCommand,
  FinishLeaveCommand,
  CancelLeaveCommand,
  LeavePlanBaseCommand, ModifyLeavePlanPeriodCommand,
} from './command';
import { YearLeaveUdo, LeavePlanCdo } from '~/lib/model';


class LeaveFlowApi {
  //
  static instance: LeaveFlowApi;
  private readonly client = new ApiClient('/api/timecard/leave-', {
    resDataName: 'response',
  });


  /* Base ----------------------------------------------------------------------------------------------------------- */

  async modifyLeavePlan(leavePlanId: string, nameValues: NameValueListModel): Promise<CommandResponse | null> {
    //
    const command = LeavePlanBaseCommand.newModify(leavePlanId, nameValues);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'base/leave-plan/command', command);
  }


  /* User - Custom -------------------------------------------------------------------------------------------------- */

  async modifyYearLeaves(yearLeaveUdos: YearLeaveUdo[]): Promise<CommandResponse | null> {
    //
    const command = ModifyYearLeavesCommand.new(yearLeaveUdos);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'custom/year-leave/modify-year-leaves', command);
  }

  async finishLeave(leaveId: string): Promise<CommandResponse | null> {
    //
    const command = FinishLeaveCommand.new(leaveId);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'custom/leave/finish-leave', command);
  }

  /* User - Flow --------------------------------------------------------------------------------------------------- */

  async cancelLeave(leaveId: string): Promise<CommandResponse | null> {
    //
    const command = CancelLeaveCommand.new(leaveId);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'flow/leave/cancel-leave', command);
  }

  async registerLeavePlan(leavePlanCdo: LeavePlanCdo): Promise<CommandResponse | null> {
    //
    const command = RegisterLeavePlanCommand.new(leavePlanCdo);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'flow/leave-plan/register-leave-plan', command);
  }

  async cancelLeavePlan(leavePlanId: string): Promise<CommandResponse | null> {
    //
    const command = CancelLeavePlanCommand.new(leavePlanId);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'flow/leave-plan/cancel-leave-plan', command);
  }

  async modifyLeavePlanByAdjustment(leavePlanId: string): Promise<CommandResponse | null> {
    // TODO
    const command = CancelLeavePlanCommand.new(leavePlanId);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'flow/leave-plan/cancel-leave-plan', command);
  }

  async doLeavePlan(leavePlanId: string): Promise<CommandResponse | null> {
    //
    const command = DoLeavePlanCommand.new(leavePlanId);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'flow/leave-plan/implement-leave-plan', command);
  }

  async modifyLeavePlanPeriod(leavePlanId: string, nameValues: NameValueListModel): Promise<CommandResponse | null> {
    //
    const command = ModifyLeavePlanPeriodCommand.new(leavePlanId, nameValues);

    return this.client.postNullable<CommandResponse>(CommandResponse, 'flow/leave-plan/modify-leave-plan-period', command);
  }
}

LeaveFlowApi.instance = new LeaveFlowApi();
export default LeaveFlowApi;
