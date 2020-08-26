import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import HeaderView from '../view/HeaderView';
import { LeaveManDaysService } from '~/lib';


interface InjectedProps {
  leaveManDaysService: LeaveManDaysService;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  render() {
    //
    const { leaveManDays } = this.injected.leaveManDaysService;

    return (
      <HeaderView dayOffCount={leaveManDays.length} />
    );
  }
}

export default ServiceInjector.useContext(LeaveManDaysService)(HeaderContainer);
