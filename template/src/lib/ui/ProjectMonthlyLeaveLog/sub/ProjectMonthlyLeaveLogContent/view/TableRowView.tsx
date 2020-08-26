import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Table } from '@nara.platform/react-ui';
import TableCellView from './TableCellView';
import LeaveManMonthRdo from '~/lib/model/leave/sdo/LeaveManMonthRdo';
import LeaveManDayModel from '~/lib/model/leave/query/LeaveManDayModel';


interface Props {
  index: number;
  leaveManMonth: LeaveManMonthRdo;
}

@autobind
@observer
class TableRowView extends ReactComponent<Props> {
  //
  render() {
    //
    const { index, leaveManMonth } = this.props;

    return (
      <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{leaveManMonth.member.name}</Table.Cell>
        <Table.Cell>{leaveManMonth.leaveCount || 0}</Table.Cell>
        {
          leaveManMonth.leaveManDays.length > 0
          && leaveManMonth.leaveManDays.map((leaveManDay: LeaveManDayModel | null, index: number) => (
            <TableCellView
              key={index}
              date={leaveManMonth.getFullStringDate(index + 1)}
              leaveManDay={leaveManDay}
            />
          ))
        }
      </Table.Row>
    );
  }
}
export default TableRowView;

