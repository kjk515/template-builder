import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Pagination } from '../../../shared';
import { LeaveService, PaginationService } from '~/lib';
import ManMonthsService from '~/lib/service/punch/logic/ManMonthsService';
import PropsContext from '~/lib/ui/LeaveRequestList/context/PropsContext';


interface InjectedProps {
  paginationService: PaginationService;
  leaveService: LeaveService;
}

@autobind
@observer
class FooterContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  render() {
    //
    const { paginationService, leaveService } = this.injected;
    const { totalCount } = leaveService;
    const { memberId, personal, onChangePage } = this.context;


    const totalPages = paginationService.getTotalPages(totalCount);

    if (!personal && !memberId && totalPages !== 0) {
      return (
        <Pagination
          totalPages={totalPages}
          onChangePage={onChangePage}
        />
      );
    }

    return null;
  }
}

export default ServiceInjector.useContext(
  ManMonthsService,
  PaginationService,
  LeaveService,
)(FooterContainer);
