import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { autobind, IdName, IdNameModel, ReactComponent } from '@nara.platform/accent';

import { Moment } from 'moment';
import { Table } from '@nara.platform/react-ui';
import { LeaveCategoryDisplayType, ManDayModel } from '~/lib/model';
import { DailyTimeLineTableBar } from '~/lib/ui/shared';
import DutyType from '../../../../../model/punch/vo/DutyType';


interface Props {
  index: number;
  member: IdNameModel;
  manDay: ManDayModel;
  hours: number[];
  onClickPunchInOutTime?: (manDayId: string, date: Moment) => void;
  onClickMemberName?: (member: IdName) => void;
}

@autobind
@observer
class ContentRowView extends ReactComponent<Props> {
  //
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

    const { onClickPunchInOutTime } = this.props;
    const workingMinutes = manDay.workingMinutes;

    return (
      <>
        <>
          <Table.Cell className="pointer" onClick={() => onClickPunchInOutTime!(manDay.id, manDay.date)}>
            { manDay.isPunchIn ? manDay.punchInTime!.format('HH:mm') : '-'}
            <br />
            { manDay.dayOff && `(${LeaveCategoryDisplayType[manDay.dayOff.category]})` }
          </Table.Cell>
          <Table.Cell className="pointer" onClick={() => onClickPunchInOutTime!(manDay.id, manDay.date)}>
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
    const { index, member, manDay, hours, onClickMemberName } = this.props;

    return (
      <Table.Row>
        <Table.Cell>
          {index + 1}
        </Table.Cell>
        <Table.Cell onClick={() => onClickMemberName && onClickMemberName(member)}>
          {member.name}
        </Table.Cell>
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

export default ContentRowView;
