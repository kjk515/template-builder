import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Moment } from 'moment';
import { Table } from '@nara.platform/react-ui';

import { EmptyTableRow } from '../../../../shared';
import TableRowView from './TableRowView';
import LeaveManMonthRdo from '~/lib/model/leave/sdo/LeaveManMonthRdo';


interface Props {
  date: Moment;
  dateList: number[];
  leaveManMonthRdos: LeaveManMonthRdo[];
  startIndex: number;
}

@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  render() {
    //
    const { date, dateList, leaveManMonthRdos, startIndex } = this.props;

    return (
      <div className="overflow">
        <Table celled textAlign="center" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                No
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                이름
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                휴가일수(일)
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={31} textAlign="center">
                {date.format('MMMM')}
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              {
                dateList.length > 0
                && dateList.map((date, index) => (
                  <Table.HeaderCell textAlign="center" key={index}>{index + 1}</Table.HeaderCell>
                ))
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              leaveManMonthRdos.length ?
                leaveManMonthRdos.map((leaveManMonth, index) => (
                  <TableRowView
                    key={index}
                    index={startIndex + index}
                    leaveManMonth={leaveManMonth}
                  />
                ))
                :
                <EmptyTableRow colSpan={40} text="조회 가능한 목록이 없습니다" />
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default ContentView;

