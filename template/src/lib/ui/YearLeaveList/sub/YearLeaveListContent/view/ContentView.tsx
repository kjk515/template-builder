import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Table, Form, Input } from '@nara.platform/react-ui';
import { YearLeaveModel } from '~/lib/model';
import { EmptyTableRow } from '~/lib/ui/shared';
import ClickColumnParams from '../../../model/ClickColumnParams';


interface Props {
  yearLeaves: YearLeaveModel[];
  editable: boolean;
  onChangePermitCounts: (index: number, type: 'month' | 'year' | 'added', value: number) => void;
  onClickColumn: (params: ClickColumnParams) => void;
  startIndex: number;
}

@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  handleColumnClick(e: any, columnIndex: number, yearLeave: YearLeaveModel) {
    e.preventDefault();
    this.props.onClickColumn({ columnIndex, yearLeave } );
  }

  render() {
    //
    const { yearLeaves, editable, onChangePermitCounts, startIndex } = this.props;

    return (
      <Table celled textAlign="center">
        <colgroup>
          <col width="5%" />
          <col width="13%" />
          <col width="*" />
          <col width="10%" />
          <col width="7%" />
          <col width="7%" />
          <col width="7%" />
          <col width="7%" />
          <col width="7%" />
          <col width="7%" />
          <col width="10%" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              No
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              이름
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              연/월차 시작일
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={3} textAlign="center">
              지급 연/월차
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              총 지급
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              사용
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              잔여
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} textAlign="center">
              연/월차 종료일
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              월차
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              연차
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              보너스휴가
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            yearLeaves && yearLeaves.length > 0 ?
              yearLeaves.map((yearLeave, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{startIndex + index + 1}</Table.Cell>
                  <Table.Cell>
                    <a href="#" onClick={(e) => this.handleColumnClick(e, 1, yearLeave)}>
                      <span className="name-title ellipsis">{yearLeave.memberName}</span>
                    </a>
                  </Table.Cell>
                  <Table.Cell>{yearLeave.permitStartDate}</Table.Cell>
                  <Table.Cell>
                    {
                      editable ?
                        <Form.Field
                          fluid
                          control={Input}
                          value={yearLeave.permitCounts.month}
                          onChange={
                            (e: React.FormEvent<HTMLInputElement>, data: any) =>
                              onChangePermitCounts(index, 'month', data.value)
                          }
                        />
                        : yearLeave.permitCounts.month
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      editable ?
                        <Form.Field
                          fluid
                          control={Input}
                          value={yearLeave.permitCounts.year}
                          onChange={
                            (e: React.FormEvent<HTMLInputElement>, data: any) =>
                              onChangePermitCounts(index, 'year', data.value)
                          }
                        />
                        : yearLeave.permitCounts.year
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      editable ?
                        <Form.Field
                          fluid
                          control={Input}
                          value={yearLeave.permitCounts.added}
                          onChange={
                            (e: React.FormEvent<HTMLInputElement>, data: any) =>
                              onChangePermitCounts(index, 'added', data.value)
                          }
                        />
                        : yearLeave.permitCounts.added
                    }
                  </Table.Cell>
                  <Table.Cell>{yearLeave.totalPermitRegularLeaveCounts}</Table.Cell>
                  <Table.Cell>
                    <span className={yearLeave.overCounts ? 'error-text' : ''}>
                      {yearLeave.totalUsedRegularLeaveCounts}{yearLeave.overCounts ? ` (+${yearLeave.overCounts})` : ''}
                    </span>
                  </Table.Cell>
                  <Table.Cell>{yearLeave.totalPermitRegularLeaveCounts - yearLeave.totalUsedRegularLeaveCounts}</Table.Cell>
                  <Table.Cell>{yearLeave.permitEndDate}</Table.Cell>
                </Table.Row>
              ))
              :
              <EmptyTableRow colSpan={30} text="조회 가능한 목록이 없습니다" />
          }
        </Table.Body>
      </Table>
    );
  }
}

export default ContentView;
