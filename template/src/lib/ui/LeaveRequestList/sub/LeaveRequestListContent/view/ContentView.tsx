import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Table } from '@nara.platform/react-ui';
import {
  LeaveCategoryType,
  LeaveCategoryDisplayType,
  LeaveModel,
  LeavePlanModel,
  LeavePlanState,
  LeaveState,
  LeaveStateDisplay,
} from '~/lib/model';
import { EmptyTableRow } from '~/lib/ui/shared';
import ClickColumnParams from '../../../model/ClickColumnParams';


interface Props {
  leaves: (LeavePlanModel | LeaveModel)[];
  personal: boolean;
  memberId: string;
  onClickColumn: (params: ClickColumnParams) => void;
  onClickActionButton: (leave: LeavePlanModel | LeaveModel) => void;
}

@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  handleColumnClick(e: any, columnIndex: number, leave: LeavePlanModel | LeaveModel) {
    //
    e.preventDefault();
    this.props.onClickColumn({ columnIndex, leave });
  }

  getLeavePlanState(leave: LeavePlanModel | LeaveModel) {
    //
    const { personal, onClickActionButton } = this.props;

    if (leave.state === LeavePlanState.Planned && !personal) {
      return (<Button secondary basic size="tiny" onClick={() => onClickActionButton(leave)}>조정요청</Button>);
    }
    else if (leave.state === LeaveState.Leaving && leave.isFinished) {
      if (personal) {
        return (<Button secondary basic size="tiny" onClick={() => onClickActionButton(leave)}>휴가완료</Button>);
      }
      else {
        return '휴가종료';
      }
    }

    return LeaveStateDisplay[leave.state];
  }

  render() {
    //
    const { leaves, personal, memberId } = this.props;

    return (
      <div className="overflow">
        <Table celled textAlign="center" unstackable fixed>
          <colgroup>
            <col width="5%" />
            <col width="15%" />
            { !personal && <col width="10%" /> }
            { !personal ? <col width="12%" /> : <col width="22%" /> }
            <col width="18%" />
            <col width="10%" />
            <col width="10%" />
            <col width="20%" />
          </colgroup>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                No
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                등록일
              </Table.HeaderCell>
              { !personal && <Table.HeaderCell>휴가등록자</Table.HeaderCell> }
              <Table.HeaderCell textAlign="center">
                휴가타입
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                휴가기간
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                휴가 일수
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                사용 연/월차
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                상태
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { leaves && leaves.length > 0 ?
              leaves.map((leave, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{leave.creationDate}</Table.Cell>
                  { !personal && (
                    <Table.Cell>
                      {
                        memberId ? leave.memberName :
                        <a href="#" onClick={(e) => this.handleColumnClick(e, 2, leave)}>
                          <span className="name-title ellipsis">{leave.memberName}</span>
                        </a>
                      }
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    <a href="#" onClick={(e) => this.handleColumnClick(e, personal ? 2 : 3, leave)}>
                      <span className="name-title ellipsis">{LeaveCategoryDisplayType[leave.type.category || 'Vacation']}</span>
                    </a>
                  </Table.Cell>
                  <Table.Cell>{leave.type.category === LeaveCategoryType.HalfOff ? leave.period.startDate : leave.period.toDisplay()}</Table.Cell>
                  <Table.Cell>{leave.dayCount}</Table.Cell>
                  <Table.Cell>{leave.isRegular ? leave.dayCount : '-'}</Table.Cell>
                  <Table.Cell>
                    { this.getLeavePlanState(leave) }
                  </Table.Cell>
                </Table.Row>
              ))
              :
              <EmptyTableRow colSpan={30} text="조회 가능한 목록이 없습니다" />
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ContentView;
