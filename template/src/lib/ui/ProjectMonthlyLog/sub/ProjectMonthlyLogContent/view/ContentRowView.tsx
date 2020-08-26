
import React from 'react';
import { autobind, IdName, IdNameModel, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Table } from '@nara.platform/react-ui';

import { ManMonthModel } from '~/lib/model';
import { ManDayIconTableCell } from '../../../../shared';


interface Props {
  index: number;
  dates: string[];
  manMonth: ManMonthModel;
  onClickMemberName: (member: IdName) => void;
}

@autobind
@observer
class ContentRowView extends ReactComponent<Props> {
  //
  render() {
    //
    const { index, dates, manMonth, onClickMemberName } = this.props;

    const member = new IdNameModel(manMonth.memberId, manMonth.memberName);

    return (
      <Table.Row>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell onClick={() => onClickMemberName(member)}>{manMonth.memberName}</Table.Cell>
        {
          dates.length > 0
          && dates.map((date, index) => (
            <ManDayIconTableCell
              key={index}
              date={date}
              dutyType={manMonth.dailyDutyTypes.length > 0 ? manMonth.dailyDutyTypes[index] : null}
            />
          ))
        }
      </Table.Row>
    );
  }
}
export default ContentRowView;
