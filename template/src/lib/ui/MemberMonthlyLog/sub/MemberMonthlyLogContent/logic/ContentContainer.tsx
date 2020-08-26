import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { ManMonthService } from '~/lib/service';
import MemberMonthlyLogService from '../../../service/MemberMonthlyLogService';
import ContentTableView from '../view/ContentTableView';


interface InjectedProps {
  memberMonthlyLogService: MemberMonthlyLogService;
  manMonthService: ManMonthService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  render() {
    //
    const { manMonthService, memberMonthlyLogService } = this.injected;
    const { manMonth } = manMonthService;
    const { date, dates } = memberMonthlyLogService;

    return (
      <ContentTableView
        date={date}
        dates={dates}
        manMonth={manMonth}
      />
    );
  }
}

export default ServiceInjector.useContext(
  MemberMonthlyLogService,
  ManMonthService,
)(ContentContainer);
