import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { Table } from '@nara.platform/react-ui';

import { ManMonthModel } from '~/lib/model';
import { EmptyTableRow, ManDayIconTableCell } from '../../../../shared';


interface Props {
  date: Moment;
  dates: string[];
  manMonth: ManMonthModel | null;
}

@autobind
@observer
class ContentTableView extends ReactComponent<Props> {
  //
  render() {
    //
    const { date, dates, manMonth } = this.props;

    return (
      <div className="overflow">
        <Table celled textAlign="center" unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={31} textAlign="center">
                {moment(date).format('MMMM')}
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              {
                dates.length > 0 && (
                  dates.map((date, index) => (
                    <Table.HeaderCell
                      key={index}
                      textAlign="center"
                    >
                      {index + 1}
                    </Table.HeaderCell>
                  ))
                )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              manMonth ? (
                <Table.Row>
                  {
                    dates.map((date, index) => (
                      <ManDayIconTableCell
                        key={index}
                        date={date}
                        dutyType={manMonth.dailyDutyTypes.length > 0 ? manMonth.dailyDutyTypes[index] : null}
                      />
                    ))
                  }
                </Table.Row>
              )
                :
                <EmptyTableRow colSpan={31} text="조회 가능한 목록이 없습니다" />
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default ContentTableView;

