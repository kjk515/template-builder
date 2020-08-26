
import React from 'react';
import { ReactComponent, autobind, IdName } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Moment } from 'moment';

import { Table } from '@nara.platform/react-ui';
import ContentRowView from './ContentRowView';
import { EmptyTableRow } from '../../../../shared';
import { ManDayTimelineModel } from '../../../../../model';


interface Props {
  manDayTimelineModels: ManDayTimelineModel[];
  startIndex: number;
  date?: Moment;
  onClickPunchInOutTime?: (manDayId: string, date: Moment) => void;
  onClickMemberName?: (member: IdName) => void;

}

@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  render() {

    const { manDayTimelineModels, onClickPunchInOutTime, onClickMemberName, startIndex } = this.props;

    return (
      <div className="timeline-table">
        <Table celled textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan={2} textAlign="center" className="mw50px">
                No
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign="center" className="mw70px">
                이름
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
              <Table.HeaderCell>0</Table.HeaderCell>
              <Table.HeaderCell>1</Table.HeaderCell>
              <Table.HeaderCell>2</Table.HeaderCell>
              <Table.HeaderCell>3</Table.HeaderCell>
              <Table.HeaderCell>4</Table.HeaderCell>
              <Table.HeaderCell>5</Table.HeaderCell>
              <Table.HeaderCell>6</Table.HeaderCell>
              <Table.HeaderCell>7</Table.HeaderCell>
              <Table.HeaderCell>8</Table.HeaderCell>
              <Table.HeaderCell>9</Table.HeaderCell>
              <Table.HeaderCell>10</Table.HeaderCell>
              <Table.HeaderCell>11</Table.HeaderCell>

              <Table.HeaderCell>12</Table.HeaderCell>
              <Table.HeaderCell>13</Table.HeaderCell>
              <Table.HeaderCell>14</Table.HeaderCell>
              <Table.HeaderCell>15</Table.HeaderCell>
              <Table.HeaderCell>16</Table.HeaderCell>
              <Table.HeaderCell>17</Table.HeaderCell>
              <Table.HeaderCell>18</Table.HeaderCell>
              <Table.HeaderCell>19</Table.HeaderCell>
              <Table.HeaderCell>20</Table.HeaderCell>
              <Table.HeaderCell>21</Table.HeaderCell>
              <Table.HeaderCell>22</Table.HeaderCell>
              <Table.HeaderCell>23</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { manDayTimelineModels && manDayTimelineModels.length > 0 ?
              manDayTimelineModels.map((manDayTimeline, index) => (
                <ContentRowView
                  key={index}
                  index={startIndex + index}
                  member={manDayTimeline.member}
                  manDay={manDayTimeline.manDay}
                  hours={manDayTimeline.hours}
                  onClickPunchInOutTime={onClickPunchInOutTime}
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
export default ContentView;

