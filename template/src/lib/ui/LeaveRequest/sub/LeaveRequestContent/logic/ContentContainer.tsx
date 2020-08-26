
import React, { ContextType } from 'react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LeavePlanModel, ChangeRequestModel } from '~/lib/model';
import { LeaveService, MemberService, YearLeaveService } from '~/lib/service';

import PropsContext from '../../../context/PropsContext';
import ContentWrapperView from '../view/ContentWrapperView';
import ContentReadView from '../view/ContentReadView';
import ContentEditView from '../view/ContentEditView';
import AdjustmentsView from '../view/AdjustmentsView';
import AdjustmentsCommentView from '../view/AdjustmentsCommentView';


interface InjectedProps {
  yearLeaveService: YearLeaveService;
  leaveService: LeaveService;
  memberService: MemberService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  onChangeLeaveProp(name: keyof LeavePlanModel, value: any) {
    //
    const { leaveService } = this.injected;

    leaveService.setLeaveProp(name, value);
  }

  onChangeChangeRequestsProp(index: number, name: keyof ChangeRequestModel, value: any) {
    //
    const { leaveService } = this.injected;

    leaveService.setChangeRequestsProp(index, name, value);
  }

  render() {
    //
    const { leaveService, yearLeaveService, memberService } = this.injected;
    const { member } = memberService;
    const { yearLeave } = yearLeaveService;
    const { leavePlan, editingAdjustment, setLeaveTimePeriodProp } = leaveService;
    const { personal } = this.context;

    if (!leavePlan) {
      return null;
    }

    if (!leavePlan.id && yearLeave && member) {
      return (
        <ContentWrapperView>
          <ContentEditView
            member={member}
            leavePlan={leavePlan}
            yearLeave={yearLeave}
            onChangeProp={this.onChangeLeaveProp}
            onChangeTimeProp={setLeaveTimePeriodProp}
          />
        </ContentWrapperView>
      );
    }

    if (editingAdjustment && member) {
      if (personal) {
        return (
          <ContentWrapperView>
            <ContentEditView
              member={member}
              onlyPeriod
              leavePlan={leavePlan}
              onChangeProp={this.onChangeLeaveProp}
              onChangeTimeProp={setLeaveTimePeriodProp}
            />
            <AdjustmentsCommentView changeRequests={leavePlan.changeRequests} onChangeChangeRequestsProp={this.onChangeChangeRequestsProp} />
          </ContentWrapperView>
        );
      }
      return (
        <ContentWrapperView>
          <ContentReadView leavePlan={leavePlan} />
          <AdjustmentsView changeRequests={leavePlan.changeRequests} onChangeChangeRequestsProp={this.onChangeChangeRequestsProp} />
        </ContentWrapperView>
      );
    }

    return (
      <ContentWrapperView>
        <ContentReadView leavePlan={leavePlan} />
        <AdjustmentsView changeRequests={leavePlan.changeRequests} />
      </ContentWrapperView>
    );
  }
}

export default ServiceInjector.useContext(
  YearLeaveService,
  LeaveService,
  MemberService,
)(ContentContainer);
