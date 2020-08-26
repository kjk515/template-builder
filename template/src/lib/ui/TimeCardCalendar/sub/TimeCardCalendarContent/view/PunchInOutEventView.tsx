import React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Button } from '@nara.platform/react-ui';
import { DutyType } from '~/lib/model';
import { PunchInOutEventModel } from '../model';


interface Props {
  event: PunchInOutEventModel;
  onClickPunchInOutButton: (manDayId: string) => void;
}

@observer
class PunchInOutEventView extends ReactComponent<Props> {
  //
  render() {
    //
    const { event, onClickPunchInOutButton } = this.props;
    const { dutyType, punchInTime, punchOutTime, punchCount } = event;

    if (dutyType === DutyType.Leave) {
      return (
        <div className="center">
          <span>휴가</span>
        </div>
      );
    }
    else {
      return (
        <div className="center">
          { punchCount === 0 && !punchInTime && !punchOutTime && (
            <div>
              <Button size="small" primary compact onClick={() => onClickPunchInOutButton(event.manDayId)}>출근하기</Button>
            </div>
          )}
          { punchCount >= 1 && punchInTime && !punchOutTime && (
            <>
              <div>
                출근 : <span className="bold">{event.punchInTime}</span>
              </div>
              <div><Button size="small" primary compact onClick={() => onClickPunchInOutButton(event.manDayId)}>퇴근하기</Button></div>
            </>
          )}
          { punchInTime && punchOutTime && (
            <>
              <div>출근 : <span className="bold">{event.punchInTime}</span></div>
              <div>퇴근 : <span className="bold">{event.punchOutTime}</span></div>
            </>
          )}
        </div>
      );
    }
  }
}

export default PunchInOutEventView;
