import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LeaveManDaysService } from '~/lib/service';
import DayOffContentView from '../view/DayOffContentView';
import DayOffContentDetailView from '../view/DayOffContentDetailView';
import DailyLogContext from '../../../context/DailyLogContext';


interface Props {
  detailed?: boolean;
}

interface InjectedProps {
  leaveManDaysService: LeaveManDaysService;
}

@autobind
@observer
class DayOffContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    detailed: false,
  };

  static contextType = DailyLogContext;

  context!: ContextType<typeof DailyLogContext>;

  render() {
    //
    const { leaveManDays } = this.injected.leaveManDaysService;
    const { detailed } = this.props;

    return (
      detailed ?
        <DayOffContentDetailView
          leaveManDays={leaveManDays}
        />
        :
        <DayOffContentView
          leaveManDays={leaveManDays}
        />
    );
  }
}

export default ServiceInjector.useContext(LeaveManDaysService)(DayOffContentContainer);
