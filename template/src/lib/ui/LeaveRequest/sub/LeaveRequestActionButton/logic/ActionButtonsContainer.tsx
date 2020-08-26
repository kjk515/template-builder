
import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, dialog } from '@nara.platform/react-ui';
import { LeaveCategoryType, LeavePlanState } from '~/lib/model';
import { LeaveService, YearLeaveService } from '~/lib/service';
import PropsContext from '../../../context/PropsContext';


interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface InjectedProps {
  leaveService: LeaveService;
  yearLeaveService: YearLeaveService;
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

  componentWillUnmount() {
    //
    const { leaveService } = this.injected;

    leaveService.setEditingAdjustment(false);
  }

  async onClickRegister() {
    //
    const { leaveService } = this.injected;
    const { onSuccess } = this.props;

    if (this.bonusLeaveCountValidation()) {
      const response = await leaveService.registerLeavePlan()
        .catch((reason) => {
          // FIXME Exception 받아서 처리하는 Util 필요.
          if (reason.failureMessage.exceptionName === 'IllegalArgumentException') {
            dialog.alert({
              title: '등록된 휴가가 있습니다.',
              message: '선택하신 날짜에 이미 등록된 휴가가 있습니다. 날짜를 변경하시거나, 등록된 휴가를 취소하신 후 다시 등록해 주세요.',
            });
          }
          else if (reason.failureMessage.exceptionName === 'NullPointerException') {
            dialog.alert({
              title: '프로젝트 기간 이후의 날짜입니다.',
              message: '선택하신 날짜는 프로젝트가 종료되었습니다. 날짜를 변경해주세요',
            });
          }
        });

      if (response) {
        await dialog.alert({ title: '휴가 신청', message: '휴가 신청이 완료되었습니다.' });
        onSuccess!();
      }
    }
    else {
      const { yearLeave } = this.injected.yearLeaveService;

      if (!yearLeave) {
        await dialog.alert({ title: '연차 정보가 없습니다.', message: '관리자에게 문의 해주세요' });
      }
      else {
        const leftBonusLeaveCounts = yearLeave.permitCounts.added - yearLeave.usedCounts.added;

        await dialog.alert({
          title: '휴가 신청',
          message: '지급 받은 보너스 휴가 수를 초과하였습니다 : 총 ' + leftBonusLeaveCounts + '개',
        });
      }
    }
  }

  bonusLeaveCountValidation(): boolean {
    //
    const { yearLeaveService, leaveService } = this.injected;
    const { leavePlan } = leaveService;
    const { yearLeave } = yearLeaveService;

    if (yearLeave && leavePlan && leavePlan.leaveCategory === LeaveCategoryType.BonusLeave) {

      leavePlan.calculateDayCount();

      return yearLeave.permitCounts.added >= leavePlan.dayCount;
    }

    return true;
  }

  onClickCancel() {
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

      await leaveService.cancelLeavePlan();

      onCancel!();
    });
  }

  async onClickDoLeave() {
    //
    const { leaveService } = this.injected;
    const { onSuccess } = this.props;

    dialog.confirm({
      title: '휴가를 시작하시겠습니까?',
      message: '해당 휴가를 시작합니다.<br />즐거운 휴가 보내시기 바랍니다.',
    }).then(async (confirmed) => {
      if (!confirmed) {
        return;
      }

      await leaveService.doLeavePlan();

      onSuccess!();
    });
  }

  async onClickAdjustmentRequest() {
    //
    this.context.initChangeRequest();
  }

  async onClickDoneAdjustmentRequest() {
    //
    const { leaveService } = this.injected;
    const { onSuccess } = this.props;

    leaveService.setLeaveProp('state', LeavePlanState.ChangeRequested);
    await leaveService.modifyLeavePlan();

    await dialog.alert({ title: '조정 요청되었습니다.', message: '조정 요청이 등록되었습니다.' });
    onSuccess!();
  }

  async onClickDoneAdjustment() {
    //
    const { leaveService } = this.injected;
    const { onSuccess } = this.props;

    leaveService.setLeaveProp('state', LeavePlanState.Planned);
    await leaveService.modifyLeavePlanPeriod();

    await dialog.alert({ title: '휴가가 조정되었습니다.', message: '휴가가 조정되어 등록되었습니다.' });
    onSuccess!();
    leaveService.findLeavePlan(leaveService.leavePlan!.id);
  }

  onClickAdjustment() {
    //
    const { leaveService } = this.injected;

    leaveService.setEditingAdjustment(true);
  }

  render() {
    //
    const { leaveService } = this.injected;
    const { leavePlan, editingAdjustment } = leaveService;
    const { personal } = this.context;

    if (!leavePlan) {
      return null;
    }

    if (!leavePlan.id) {
      return (<Button primary className="simple" onClick={this.onClickRegister}>휴가 등록하기</Button>);
    }

    if (personal) {
      if (editingAdjustment) {
        return (<Button primary className="simple" onClick={this.onClickDoneAdjustment}>조정완료</Button>);
      }
      if (leavePlan.state === LeavePlanState.ChangeRequested) {
        return (
          <>
            <Button primary className="simple" onClick={this.onClickCancel}>휴가취소</Button>
            <Button primary className="simple" onClick={this.onClickAdjustment}>휴가조정</Button>
          </>
        );
      }
      if (leavePlan.possibleLeave) {
        return (
          <>
            <Button primary className="simple" onClick={this.onClickCancel}>휴가취소</Button>
            <Button primary className="simple" onClick={this.onClickDoLeave}>휴가시작</Button>
          </>
        );
      }
      if (leavePlan.state === LeavePlanState.Planned) {
        return (<Button primary className="simple" onClick={this.onClickCancel}>휴가취소</Button>);
      }
    }
    else {
      if (editingAdjustment) {
        return (<Button primary className="simple" onClick={this.onClickDoneAdjustmentRequest}>조정요청</Button>);
      }
      if (leavePlan.state === LeavePlanState.Planned) {
        return (<Button primary className="simple" onClick={this.onClickAdjustmentRequest}>조정 요청하기</Button>);
      }
    }

    return null;
  }
}

export default ServiceInjector.useContext(
  LeaveService,
  YearLeaveService,
)(ActionButtonsContainer);
