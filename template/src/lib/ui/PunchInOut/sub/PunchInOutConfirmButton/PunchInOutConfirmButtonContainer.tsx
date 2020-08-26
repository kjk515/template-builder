
import React from 'react';
import { autobind, NotInstantiatedException, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Button, dialog } from '@nara.platform/react-ui';
import { DailyPunchesService, ManDayService } from '~/lib/service';
import PunchInOutService from '../../service/PunchInOutService';


interface Props {
  className?: string;
  children?: React.ReactNode;
  onSuccessPunchIn?: () => void;
  onSuccessPunchOut?: () => void;
  onFail?: () => void;
}

interface InjectedProps {
  manDayService: ManDayService;
  dailyPunchesService: DailyPunchesService;
  punchInOutService: PunchInOutService;
}

/**
 * 출퇴근 확인 버튼입니다.
 */
@autobind
@observer
class PunchInOutConfirmButtonContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    className: 'simple',
    children: '확인',
    onSuccess: () => {},
  };

  onClickPunchInOut(): void | null {
    //
    const { manDayService, dailyPunchesService, punchInOutService } = this.injected;
    const { onSuccessPunchIn, onSuccessPunchOut, onFail } = this.props;
    const { manDay } = manDayService;
    const { targetDailyPunch } = dailyPunchesService;

    if (!manDay) {
      throw new NotInstantiatedException('PunchInOut.Confirm', 'manDayService.manDay');
    }

    const time = punchInOutService.time;

    if (!targetDailyPunch) {
      return;
    }

    const isTimeSet = !!time;

    if (time && !this.validationCheck()) {
      if (onFail) {
        onFail();
      }
      else {
        dialog.alert({
          title: '사유를 적어주세요.',
          message: '퇴근시간이 상이할 경우 사유를 5자 이상 적어야합니다.',
        });
      }
    }
    else if (!targetDailyPunch.punchOut) { // punchIn
      // punching
      manDayService.punchIn(manDay.id, targetDailyPunch.office, targetDailyPunch.punchIn, isTimeSet)
        .then(() => {
          if (onSuccessPunchIn) {
            onSuccessPunchIn();
          }
        });
    }
    else {
      manDayService.punchOut(manDay.id, targetDailyPunch.punchOut, isTimeSet)
        .then(() => {
          if (onSuccessPunchOut) {
            onSuccessPunchOut();
          }
        });
    }
  }

  validationCheck(): boolean {
    //
    const { dailyPunchesService } = this.injected;
    const { targetDailyPunch } = dailyPunchesService;

    if (!targetDailyPunch) {
      return false;
    }
    if (targetDailyPunch.punchOut) {
      return targetDailyPunch.punchOut.comment.length >= 5;
    }
    else if (targetDailyPunch.punchIn) {
      return targetDailyPunch.punchIn.comment.length >= 5;
    }
    return true;
  }


  render() {
    //
    const { dailyPunchesService } = this.injected;
    const { targetDailyPunch } = dailyPunchesService;
    const { className, children } = this.props;
    return (
      <Button
        key={targetDailyPunch ? targetDailyPunch.id : ''}
        primary
        className={className}
        onClick={() => this.onClickPunchInOut()}
      >
        {children}
      </Button>
    );
  }
}

export default ServiceInjector.useContext(
  ManDayService,
  DailyPunchesService,
  PunchInOutService
)(PunchInOutConfirmButtonContainer);
