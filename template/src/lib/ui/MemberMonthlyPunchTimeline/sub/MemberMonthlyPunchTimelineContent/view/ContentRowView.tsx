import React, { ReactNode } from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { Button, Table } from '@nara.platform/react-ui';

import classNames from 'classnames';
import { LeaveCategoryDisplayType, ManDayModel } from '~/lib/model';
import { DailyTimeLineTableBar } from '~/lib/ui/shared';


interface Props {
  hours: number[];
  date: Moment;
  manDay: ManDayModel;
  onClickPunchInOut: (manDayId: string, date: Moment) => void;
  onClickPunchInOutTime: (manDayId: string, date: Moment) => void;
}

@autobind
@observer
class ContentRowView extends ReactComponent<Props> {
  //
  today = moment();

  isWeekend(date: Moment): boolean {
    //
    return date.day() === 0 || date.day() === 6;
  }

  renderCells(manDay: ManDayModel): ReactNode {
    //
    if (!manDay.isPunchIn) {
      const isToday = this.today.isSame(manDay.date, 'date');

      return isToday ? this.renderPunchInCells(manDay) : this.renderEmptyCells();
    }
    else if (manDay.isPunchIn && !manDay.isPunchOut) {
      //
      return this.renderPunchOutCells(manDay);
    }
    else if (manDay.isPunchIn && manDay.isPunchOut) {
      return this.renderPunchedCells(manDay);
    }
    else {
      return null;
    }
  }

  renderPunchInCells(manDay: ManDayModel): ReactNode {

    const { onClickPunchInOut } = this.props;

    return (
      <>
        <Table.Cell><Button secondary size="mini" onClick={() => onClickPunchInOut(manDay.id, manDay.date)}>출근하기</Button></Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </>
    );
  }

  renderPunchOutCells(manDay: ManDayModel): ReactNode {

    const { onClickPunchInOut, onClickPunchInOutTime } = this.props;

    return (
      <>
        <Table.Cell className="pointer" onClick={() => onClickPunchInOutTime(manDay.id, manDay.date)}>
          { manDay.punchInTime!.format('HH:mm') }
          <br />
          { manDay.dayOff && `(${LeaveCategoryDisplayType[manDay.dayOff.category]})` }
        </Table.Cell>
        <Table.Cell><Button secondary size="mini" onClick={() => onClickPunchInOut(manDay.id, manDay.date)}>퇴근하기</Button></Table.Cell>
        <Table.Cell>-</Table.Cell>
      </>
    );
  }

  renderEmptyCells(): ReactNode {

    return (
      <>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </>
    );
  }

  renderPunchedCells(manDay: ManDayModel) {

    const { onClickPunchInOutTime } = this.props;

    const workingMinutes = manDay.workingMinutes;

    return (
      <>
        <>
          <Table.Cell className="pointer" onClick={() => onClickPunchInOutTime(manDay.id, manDay.date)}>
            {manDay.dayOn ? moment(manDay.dayOn.punchInTime).format('HH:mm') : '-'}
            <br />
            { manDay.dayOff && `(${LeaveCategoryDisplayType[manDay.dayOff.category]})` }
          </Table.Cell>
          <Table.Cell className="pointer" onClick={() => onClickPunchInOutTime(manDay.id, manDay.date)}>
            {manDay.dayOn ? moment(manDay.dayOn.punchOutTime).format('HH:mm') : '-'}
          </Table.Cell>
        </>

        {
          workingMinutes < 60 ?
            <Table.Cell>
              { workingMinutes ? `${Math.floor(workingMinutes)}분` : '-' }
            </Table.Cell>
            :
            <Table.Cell>
              { Math.floor(workingMinutes / 60)}시간 {(Math.floor(workingMinutes % 60)) }분
            </Table.Cell>
        }
      </>
    );
  }

  render() {
    //
    const { hours, date, manDay } = this.props;

    return (
      <Table.Row
        className={classNames({
          weekend: this.isWeekend(date),
        })}
      >
        <Table.Cell>{date.format('DD일(ddd)')}</Table.Cell>
        {
          this.renderCells(manDay)
        }
        <DailyTimeLineTableBar
          hours={hours}
          manDay={manDay}
          isWeekend={this.isWeekend(date)}
        />
      </Table.Row>
    );
  }
}

export default ContentRowView;

