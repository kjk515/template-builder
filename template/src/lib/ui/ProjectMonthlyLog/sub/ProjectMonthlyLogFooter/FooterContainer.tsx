import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Pagination } from '../../../shared';
import ProjectMonthlyLogContext from '../../context/ProjectMonthlyLogContext';
import ProjectMonthlyLogService from '../../service/ProjectMonthlyLogService';
import { PaginationService } from '~/lib';
import ManMonthsService from '~/lib/service/punch/logic/ManMonthsService';


interface InjectedProps {
  projectMonthlyLogService: ProjectMonthlyLogService;
  paginationService: PaginationService;
  manMonthsService: ManMonthsService;
}

@autobind
@observer
class FooterContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = ProjectMonthlyLogContext;

  context!: ContextType<typeof ProjectMonthlyLogContext>;

  render() {
    //
    const { paginationService, manMonthsService } = this.injected;
    const { projectMonthlyLog } = this.context;
    const { totalCount } = manMonthsService;

    const totalPages = paginationService.getTotalPages(totalCount);

    if (totalPages !== 0) {
      return (
        <Pagination
          totalPages={totalPages}
          onChangePage={projectMonthlyLog.onChangePage}
        />
      );
    }

    return null;
  }
}

export default ServiceInjector.useContext(
  ProjectMonthlyLogService,
  ManMonthsService,
  PaginationService,
)(FooterContainer);
