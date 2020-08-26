import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import ContentView from '../view/ContentView';
import { LeaveManMonthsService, PaginationService } from '~/lib';
import ProjectMonthlyLeaveLogContext from '../../../context/ProjectMonthlyLeaveLogContext';


interface InjectedProps {
  leaveManMonthsService: LeaveManMonthsService;
  paginationService: PaginationService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = ProjectMonthlyLeaveLogContext;

  context!: ContextType<typeof ProjectMonthlyLeaveLogContext>;

  makeDateList() {
    //
    const { projectMonthlyLeaveLogContext } = this.context;
    const date = projectMonthlyLeaveLogContext.date;
    const monthLength = date.daysInMonth();
    const dateList = [];

    for (let i = 1; i <= monthLength; i++) {
      dateList.push(i);
    }

    return dateList;
  }

  render() {
    //
    const { leaveManMonthsService, paginationService } = this.injected;
    const { leaveManMonthRdos } = leaveManMonthsService;
    const { startIndex } = paginationService;
    const { projectMonthlyLeaveLogContext } = this.context;
    const dateList = this.makeDateList();

    return (
      <ContentView
        date={projectMonthlyLeaveLogContext.date}
        dateList={dateList}
        leaveManMonthRdos={leaveManMonthRdos}
        startIndex={startIndex}
      />
    );
  }
}

export default ServiceInjector.useContext(
  LeaveManMonthsService,
  PaginationService,
)(ContentContainer);

