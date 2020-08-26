import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Table } from '@nara.platform/react-ui';
import { LeaveCountsRdo } from '~/lib/model';
import { EmptyTableRow } from '~/lib/ui/shared';


interface Props {
  leaveSummary: LeaveCountsRdo | null;
}

@autobind
@observer
class LeaveSummaryView extends ReactComponent<Props> {
  //
  render() {
    //
    const { leaveSummary } = this.props;

    return (
      <div className="overflow">
        <Table celled textAlign="center" unstackable fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                연차지급 기준일
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={2} textAlign="center">
                지급 연/월차 및 보너스
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                사용한 연/월차
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                연/월차
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                반차
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                출산휴가
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                경조사
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                병가
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center">
                보너스휴가
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                연/월차
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                보너스휴가
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { leaveSummary ?
              <Table.Row textAlign="center">
                <Table.Cell>{leaveSummary.permitStartDate}</Table.Cell>
                <Table.Cell>{leaveSummary.permitLeaves}</Table.Cell>
                <Table.Cell>{leaveSummary.permitAddedLeaves}</Table.Cell>
                <Table.Cell>
                  <span className={leaveSummary.overLeaves ? 'error-text' : ''}>
                    {leaveSummary.usedLeaves}{leaveSummary.overLeaves ? ` (+${leaveSummary.overLeaves})` : ''}
                  </span>
                </Table.Cell>
                <Table.Cell>{leaveSummary.usedVacationLeaves}</Table.Cell>
                <Table.Cell>{leaveSummary.usedHalfLeaves}</Table.Cell>
                <Table.Cell>{leaveSummary.usedMaternityLeaves}</Table.Cell>
                <Table.Cell>{leaveSummary.usedCondolenceLeaves}</Table.Cell>
                <Table.Cell>{leaveSummary.usedSickLeaves}</Table.Cell>
                <Table.Cell>{leaveSummary.usedBonusLeaves}</Table.Cell>
              </Table.Row>
              :
              <EmptyTableRow colSpan={10} />
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default LeaveSummaryView;
