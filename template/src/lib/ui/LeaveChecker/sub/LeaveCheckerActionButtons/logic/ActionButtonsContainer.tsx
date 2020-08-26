import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, dialog } from '@nara.platform/react-ui';
import { LeaveState } from '~/lib/model';
import { LeaveService } from '~/lib/service';
import PropsContext from '../../../context/PropsContext';


interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface InjectedProps {
  leaveService: LeaveService;
}

@autobind
@observer
class ActionButtonsContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static contextType = PropsContext;
  static defaultProps = {
    onSuccess: () => {},
    onCancel: () => {},
  };

  context!: ContextType<typeof PropsContext>;

  async onClickComplete() {
    //
    const { leaveService } = this.injected;
    const { onSuccess } = this.props;

    await leaveService.finishLeave();

    await dialog.alert({ title: '휴가가 완료되었습니다.', message: '해당 휴가가 완료되었습니다. 연차 차감 휴가의 경우,<br/>일 수 만큼 연차가 차감됩니다.' });
    onSuccess!();
  }

  async onClickCancel() {
    //
    const { leaveService } = this.injected;
    const { onCancel } = this.props;

    dialog.confirm({
      title: '휴가를 취소하시겠습니까?',
      message: '해당 휴가를 취소하시겠습니까?<br />[예, 휴가를 취소합니다]를 클릭하시면 휴가가 취소됩니다.',
    }).then(async (confirmed) => {
      if (!confirmed) {
        return;
      }

      await leaveService.cancelLeave();

      onCancel!();
    });
  }

  render() {
    //
    const { leaveService } = this.injected;
    const { leave } = leaveService;
    const { personal } = this.context;

    if (!leave) {
      return null;
    }

    if (personal) {
      if (leave.isFinished) {
        return (<Button primary className="simple" onClick={this.onClickComplete}>휴가완료</Button>);
      }
      if (leave.state === LeaveState.Leaving) {
        return (<Button primary className="simple" onClick={this.onClickCancel}>휴가취소</Button>);
      }
    }

    return null;
  }
}

export default ServiceInjector.useContext(
  LeaveService,
)(ActionButtonsContainer);
