
import React, { ContextType } from 'react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { YearLeavesService, PaginationService } from '~/lib/service';
import ContentView from '../view/ContentView';
import PropsContext from '../../../context/PropsContext';


interface InjectedProps {
  yearLeavesService: YearLeavesService;
  paginationService: PaginationService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  onChangePermitCounts(index: number, type: 'month' | 'year' | 'added', value: any) {
    //
    const { yearLeavesService } = this.injected;

    yearLeavesService.setPermitCounts(index, type, value);
  }

  render() {
    const { paginationService, yearLeavesService } = this.injected;
    const { yearLeaves } = yearLeavesService;
    const { startIndex } = paginationService;
    const { editable, onClickColumn } = this.context;

    return (
      <ContentView
        yearLeaves={yearLeaves}
        editable={editable}
        onChangePermitCounts={this.onChangePermitCounts}
        onClickColumn={onClickColumn}
        startIndex={startIndex}
      />
    );
  }
}

export default ServiceInjector.useContext(
  YearLeavesService,
  PaginationService
)(ContentContainer);
