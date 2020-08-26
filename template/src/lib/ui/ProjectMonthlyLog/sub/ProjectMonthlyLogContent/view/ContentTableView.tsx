import React from 'react';
import { autobind, IdName, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { Table } from '@nara.platform/react-ui';

import { ManMonthModel } from '~/lib/model';
import { EmptyTableRow } from '../../../../shared';
import ContentRowView from './ContentRowView';


interface Props {
  date: Moment;
  dates: string[];
  startIndex: number;
  manMonths: ManMonthModel[];
  onClickMemberName: (member: IdName) => void;
}

@autobind
@observer
class ContentTableView extends ReactComponent<Props> {
  //
  render() {
    //
    const { date, dates, startIndex, manMonths, onClickMemberName } = this.props;

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
              <Table.HeaderCell colSpan={31} textAlign="center">
                {moment(date).format('MMMM')}
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              {
                dates.length > 0
                && dates.map((date, index) => (
                  <Table.HeaderCell textAlign="center" key={index}>
                    {index + 1}
                  </Table.HeaderCell>
                ))
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              manMonths.length > 0 ?
                manMonths.map((manMonth: ManMonthModel, index: number) => (
                  <ContentRowView
                    key={index}
                    index={startIndex + index}
                    dates={dates}
                    manMonth={manMonth}
                    onClickMemberName={onClickMemberName}
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
export default ContentTableView;

