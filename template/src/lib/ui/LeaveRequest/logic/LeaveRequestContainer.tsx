
import React from 'react';
import moment from 'moment';
import { ReactComponent, autobind, ServiceInjector, NoSuchDataException } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LeaveService, MemberService, YearLeaveService } from '~/lib/service';
import PropsContext from '../context/PropsContext';
import { LeavePlanModel } from '~/lib/model';


interface Props {
  projectId: string;
  children: React.ReactNode;
  leavePlanId?: string;
  personal?: boolean;
  editingAdjustment?: boolean;
  onClickAdjustment?: (leave: LeavePlanModel) => void;
}

interface InjectedProps {
  leaveService: LeaveService;
  memberService: MemberService;
  yearLeaveService: YearLeaveService;
}

/**
 *  휴가신청/휴가조회/휴가조정 모달 컴포넌트입니다.
 */
@autobind
@observer
class LeaveRequestContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    personal: false,
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { leavePlanId: prevLeavePlanId, editingAdjustment: prevEditingAdjustment } = prevProps;
    const { leavePlanId, editingAdjustment } = this.props;

    if ((leavePlanId && prevLeavePlanId !== leavePlanId) || (editingAdjustment && editingAdjustment !== prevEditingAdjustment)) {
      this.init();
    }
  }

  async init() {
    //
    const { leavePlanId, personal, editingAdjustment } = this.props;

    if (leavePlanId) {
      await this.findLeavePlan(leavePlanId);

      if (!personal && editingAdjustment) {
        this.initChangeRequest();
      }
    }
    else {
      this.initLeavePlan();
    }
  }

  async initChangeRequest() {
    //
    const { memberService, leaveService } = this.injected;
    const { projectId } = this.props;
    const member = await memberService.findMemberByProjectIdAndAudienceId(projectId);

    if (!member) {
      throw new NoSuchDataException('LeaveRequestContent', `member is required -> projectId: ${projectId}`);
    }

    leaveService.setEditingAdjustment(true);
    leaveService.initChangeRequest(member);
  }

  async initLeavePlan() {
    //
    const { memberService, leaveService, yearLeaveService } = this.injected;
    const { projectId } = this.props;

    const member = await memberService.findMemberByProjectIdAndAudienceId(projectId);

    if (!member) {
      throw new NoSuchDataException('LeaveRequest', `member is required -> projectId: ${projectId}`);
    }

    const yearLeave = await yearLeaveService.findYearLeave(member.id, moment().format('YYYY'));

    leaveService.initLeavePlan(yearLeave.id, projectId, member, member);
  }

  async findLeavePlan(leavePlanId: string) {
    //
    const { leaveService } = this.injected;

    await leaveService.findLeavePlan(leavePlanId);
  }

  getContext() {
    //
    const { leavePlanId = '', personal = false } = this.props;

    return { leavePlanId, personal, initChangeRequest: this.initChangeRequest };
  }

  render() {
    //
    return (
      <PropsContext.Provider value={this.getContext()}>
        {this.props.children}
      </PropsContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  LeaveService,
  MemberService,
  YearLeaveService,
)(LeaveRequestContainer);
