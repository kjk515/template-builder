import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import classNames from 'classnames';

import { Moment } from 'moment';
import { Table } from '@nara.platform/react-ui';
import { LeaveCategoryDisplayType, ManDayModel } from '~/lib/model';
import { DailyTimeLineTableBar } from '~/lib/ui/shared';
import DutyType from '../../../../../model/punch/vo/DutyType';


interface Props {
  hours: number[];
  date: Moment;
  manDay: ManDayModel;
  onClickPunchInOutTime?: (manDayId: string, date: Moment) => void;
}

@autobind
@observer
class ReadOnlyContentView extends ReactComponent<Props> {
  //
  isWeekend(date: Moment): boolean {
    //
    return date.day() === 0 || date.day() === 6;
  }

  renderCells(manDay: ManDayModel | null): ReactNode {
    //
    if (manDay === null) {
      return this.renderEmptyCells();
    }

    switch (manDay.dutyType) {
      case DutyType.Leave:
        return this.renderLeaveCells(manDay);
      default:
        return this.renderPunchedCells(manDay);
    }
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

  renderLeaveCells(manDay: ManDayModel) {

    return (
      <>
        <Table.Cell>{ LeaveCategoryDisplayType[manDay.leaveCategory] }</Table.Cell>
        <Table.Cell />
        <Table.Cell />
      </>
    );
  }

  renderPunchedCells(manDay: ManDayModel) {

    const workingMinutes = manDay.workingMinutes;

    const onClickPunchInOutTime = this.props.onClickPunchInOutTime;
    const clickableTimeLabel = !!onClickPunchInOutTime;

    return (
      <>
        <>
          <Table.Cell onClick={onClickPunchInOutTime} className={clickableTimeLabel ? 'pointer' : ''}>
            { manDay.isPunchIn ? manDay.punchInTime!.format('HH:mm') : '-'}
            <br />
            { manDay.dayOff && `(${LeaveCategoryDisplayType[manDay.dayOff.category]})` }
          </Table.Cell>
          <Table.Cell onClick={onClickPunchInOutTime}>
            { manDay.isPunchOut ? manDay.punchOutTime!.format('HH:mm') : '-'}
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
          manDay={manDay}
          hours={hours}
        />
      </Table.Row>
    );
  }
}

export default ReadOnlyContentView;
