import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { dialog } from '@nara.platform/react-ui';
import { LeaveService, PaginationService } from '~/lib/service';
import ContentView from '../view/ContentView';
import PropsContext from '../../../context/PropsContext';
import { LeavePlanModel, LeavePlanState, LeaveModel } from '~/lib/model';


interface InjectedProps {
  leaveService: LeaveService;
  paginationService: PaginationService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  async onClickActionButton(leave: LeavePlanModel | LeaveModel) {
    //
    const { leaveService } = this.injected;

    if (leave.state === LeavePlanState.Planned) {
      this.context.onClickAdjustment(leave);
    }
    else {
      await leaveService.finishLeave(leave.id);

      await dialog.alert({ title: '휴가가 완료되었습니다.', message: '해당 휴가가 완료되었습니다. 연차 차감 휴가의 경우,<br/>일 수 만큼 연차가 차감됩니다.' });
      this.context.onCompleteAction();
    }
  }

  render() {
    const { leaves } = this.injected.leaveService;
    const { personal, memberId, onClickColumn } = this.context;

    return (
      <ContentView
        leaves={leaves}
        personal={personal}
        memberId={memberId}
        onClickColumn={onClickColumn}
        onClickActionButton={this.onClickActionButton}
      />
    );
  }
}

export default ServiceInjector.useContext(
  LeaveService,
  PaginationService,
)(ContentContainer);
