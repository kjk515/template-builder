import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Table } from '@nara.platform/react-ui';

import { LeaveCategoryIconType } from '~/lib/model';
import LeaveManDayModel from '~/lib/model/leave/query/LeaveManDayModel';


interface Props {
  leaveManDay: LeaveManDayModel | null;
  date: string;
}

@autobind
@observer
class TableCellView extends ReactComponent<Props> {
  //
  private today = moment().format('YYYY-MM-DD');


  isWeekend(date: string): boolean {
    //
    return moment(date).day() === 0 || moment(date).day() === 6;
  }

  getIcon(): React.ReactNode | null {
    //
    const { leaveManDay } = this.props;

    if (leaveManDay === null) {
      return null;
    }
    else {
      return <Icon className={LeaveCategoryIconType[leaveManDay.category]} />;
    }
  }

  render() {
    //
    const { date } = this.props;

    return (
      <Table.Cell
        className={classNames({
          today: date === this.today,
          weekend: this.isWeekend(date),
        })}
      >
        {this.getIcon()}
      </Table.Cell>
    );
  }
}

export default TableCellView;

