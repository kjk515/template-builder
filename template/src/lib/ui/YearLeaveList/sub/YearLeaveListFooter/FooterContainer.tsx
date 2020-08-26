import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Pagination } from '../../../shared';
import PropsContext from '../../context/PropsContext';

import { PaginationService, YearLeavesService } from '~/lib';


interface InjectedProps {
  yearLeavesService: YearLeavesService;
  paginationService: PaginationService;
}

@autobind
@observer
class FooterContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  render() {
    //
    const { paginationService, yearLeavesService } = this.injected;
    const { onChangePage } = this.context;
    const { totalCount } = yearLeavesService;

    const totalPages = paginationService.getTotalPages(totalCount);

    if (totalPages !== 0) {
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
  YearLeavesService,
  PaginationService
)(FooterContainer);
