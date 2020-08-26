import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LeaveCountsRdoService, LeaveService } from '~/lib/service';
import PropsContext from '../../../context/PropsContext';
import NotifyHeaderView from '../view/NotifyHeaderView';
import PersonalHeaderView from '../view/PersonalHeaderView';
import MemberHeaderView from '~/lib/ui/LeaveRequestList/sub/LeaveRequestListHeader/view/MemberHeaderView';


interface InjectedProps {
  leaveService: LeaveService;
  leaveCountsRdoService: LeaveCountsRdoService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  render() {
    const { personal, memberId, isPlan } = this.context;
    const { leaveService, leaveCountsRdoService } = this.injected;
    const { leaves } = leaveService;
    const { leaveSummary } = leaveCountsRdoService;

    if (personal) {
      if (!leaveSummary) {
        return null;
      }

      return (
        <PersonalHeaderView
          leaveSummary={leaveSummary}
        />
      );
    }
    else if (memberId) {
      return (
        <MemberHeaderView
          isPlan={isPlan}
          leaveCount={leaves.length}
        />
      );
    }
    return (
      <NotifyHeaderView
        newLeaveCount={0}
      />
    );
  }
}

export default ServiceInjector.useContext(
  LeaveService,
  LeaveCountsRdoService,
)(ContentContainer);
