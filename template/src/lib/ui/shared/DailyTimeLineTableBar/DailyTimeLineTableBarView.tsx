
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';

import { Table } from '@nara.platform/react-ui';
import ManDayModel from '../../../model/punch/ManDayModel';


interface Props {
  manDay: ManDayModel;
  hours: number[];
  isWeekend?: boolean;
}


@autobind
@observer
class DailyTimeLineTableBarView extends ReactComponent<Props> {
  //
  workingTimeArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  now = moment();


  getTimelineBarCell(hour: number, cellWidth: number, manDay: ManDayModel) {
    //
    const isFutureDate = moment().diff(manDay.date) < 0;
    const isPunchIn = manDay.punchInTime !== null;

    if (isFutureDate || !isPunchIn) {
      return null;
    }

    const today = moment().format('YYYY-MM-DD');
    const manDayDate = manDay.date.format('YYYY-MM-DD');
    const workingMinutes = manDay.workingMinutes;
    const punchInMinute = Number(manDay.punchInMinute);
    const isPunchOut = manDay.isPunchOut;
    const punchInMinuteRatio = punchInMinute / 60;
    const barWidthByMinute = cellWidth / 60;

    const barWidth = workingMinutes * barWidthByMinute;
    const leftPadding = cellWidth * punchInMinuteRatio;

    return (
      <div className="bar" key={hour}>
        <span
          className={classNames({
            'event-point': true,
            skyblue: isPunchOut && isPunchOut,
            blue: today === manDayDate && !isPunchOut,
            red: today !== manDayDate && !isPunchOut,
          })}
          style={{
            left: String(leftPadding) + 'px',
            width: String(barWidth) + 'px',
          }}
        />
      </div>
    );
  }

  render() {
    //
    const { manDay, hours, isWeekend } = this.props;
    const cellWidth = 37;

    return (
      <Table.Cell colSpan={24}>
        <div className="timeline">
          <Table>
            <Table.Body>
              <Table.Row
                className={
                  classNames({
                    weekend: isWeekend,
                  })
                }
              >
                { hours.map((hour, index) => (
                  <Table.Cell
                    key={index}
                    className={classNames({
                      'work-time': this.workingTimeArray.includes(hour),
                      now: Number(hour) === this.now.hour(),
                    })}
                  >
                    { (Number(manDay.punchInHour) === hour)
                    && (
                      this.getTimelineBarCell(hour, cellWidth, manDay)
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Table.Cell>
    );
  }
}
export default DailyTimeLineTableBarView;

