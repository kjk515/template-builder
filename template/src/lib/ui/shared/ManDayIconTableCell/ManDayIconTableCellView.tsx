import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Table } from '@nara.platform/react-ui';
import { DutyType, DutyTypeIconType } from '~/lib/model';


interface Props {
  date: string;
  dutyType?: DutyType | null;
}

@autobind
@observer
class ManDayIconTableCellView extends ReactComponent<Props> {
  //
  private today = moment().format('YYYY-MM-DD');

  isWeekend(date: string): boolean {
    //
    return moment(date).day() === 0 || moment(date).day() === 6;
  }

  render() {
    //
    const { date, dutyType } = this.props;

    return (
      <Table.Cell
        className={classNames({
          today: moment(date).format('YYYY-MM-DD') === this.today,
          weekend: this.isWeekend(date),
        })}
      >
        <Icon className={dutyType ? DutyTypeIconType[dutyType] : ''} />
      </Table.Cell>
    );
  }
}

export default ManDayIconTableCellView;
