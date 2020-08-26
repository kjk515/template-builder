
import React from 'react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { YearLeavesService } from '~/lib/service/leave';
import HeaderView from '../view/HeaderView';


interface InjectedProps {
  yearLeavesService: YearLeavesService;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static defaultProps = {
    editable: false,
  };

  render() {
    const { totalCount } = this.injected.yearLeavesService;

    return (
      <HeaderView
        count={totalCount}
      />
    );
  }
}

export default ServiceInjector.useContext(
  YearLeavesService,
)(HeaderContainer);
