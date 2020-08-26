
import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ManMonthsService } from '~/lib/service';
import { PanelSubFields } from '../../../shared';


interface InjectedProps {
  manMonthsService: ManMonthsService;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  render() {
    //
    // const { totalCount } = this.injected.manMonthsService;

    return (
      <PanelSubFields>
        <PanelSubFields.LabelGroup width={8}>
          {/*<PanelSubFields.CountLabel*/}
          {/*  label="총 구성원"*/}
          {/*  count={totalCount || 0}*/}
          {/*  countingUnit="명"*/}
          {/*/>*/}
        </PanelSubFields.LabelGroup>

        <PanelSubFields.ManDayLabels />
      </PanelSubFields>
    );
  }
}

export default ServiceInjector.useContext(ManMonthsService)(HeaderContainer);
