import React from 'react';
import { observer } from 'mobx-react';
import { Moment } from 'moment';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { Table } from '@nara.platform/react-ui';
import { ManDayModel } from '~/lib/model';
import { EmptyTableRow } from '~/lib/ui/shared';
import ContentRowView from './ContentRowView';
import ReadOnlyContentView from './ReadOnlyContentRowView';


interface Props {
  personal: boolean;
  hours: number[];
  manDays: ManDayModel[];
  onClickPunchInOut: (manDayId: string, date: Moment) => void;
  onClickPunchInOutTime: (manDayId: string, date: Moment) => void;
}

@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  render() {
    //
    const { personal, hours, manDays, onClickPunchInOut, onClickPunchInOutTime } = this.props;

    return (
      <div className="timeline-table">
        <Table celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan={2} textAlign="center" className="mw70px">
                날짜
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center" className="mw70px">
                출근
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center" className="mw70px">
                퇴근
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center" className="mw100px">
                근무시간
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={12} textAlign="center">
                AM
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={12} textAlign="center">
                PM
              </Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              {
                hours.map(hour => (
                  <Table.HeaderCell key={hour}>{hour}</Table.HeaderCell>
                ))
              }
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              manDays.length > 0 ?
                manDays.map((manDay, index) => (
                  personal ?
                    <ContentRowView
                      key={index}
                      hours={hours}
                      date={manDay.date}
                      manDay={manDay}
                      onClickPunchInOut={onClickPunchInOut}
                      onClickPunchInOutTime={onClickPunchInOutTime}
                    />
                    :
                    <ReadOnlyContentView
                      key={index}
                      hours={hours}
                      date={manDay.date}
                      manDay={manDay}
                    />
                ))
                :
                (
                  <EmptyTableRow colSpan={40} text="조회 가능한 목록이 없습니다" />
                )
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default ContentView;

