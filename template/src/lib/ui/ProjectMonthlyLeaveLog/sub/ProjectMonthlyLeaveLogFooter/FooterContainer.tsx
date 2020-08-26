import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Pagination } from '../../../shared';
import { PaginationService, LeaveManMonthsService } from '~/lib';
import ProjectMonthlyLeaveLogContext from '../../context/ProjectMonthlyLeaveLogContext';


interface InjectedProps {
  leaveManMonthsService: LeaveManMonthsService;
  paginationService: PaginationService;
}

@autobind
@observer
class FooterContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = ProjectMonthlyLeaveLogContext;

  context!: ContextType<typeof ProjectMonthlyLeaveLogContext>;

  render() {
    //
    const { paginationService, leaveManMonthsService } = this.injected;
    const { projectMonthlyLeaveLogContext } = this.context;
    const { totalCount } = leaveManMonthsService;

    const totalPages = paginationService.getTotalPages(totalCount);

    if (totalPages !== 0) {
      return (
        <Pagination
          totalPages={totalPages}
          onChangePage={projectMonthlyLeaveLogContext.onChangePage}
        />
      );
    }

    return null;
  }
}

export default ServiceInjector.useContext(
  LeaveManMonthsService,
  PaginationService
)(FooterContainer);
