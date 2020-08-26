
import React, { ContextType } from 'react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LeaveService } from '~/lib/service';

import PropsContext from '../../../context/PropsContext';
import ContentWrapperView from '../view/ContentWrapperView';
import ContentReadView from '../view/ContentReadView';


interface InjectedProps {
  leaveService: LeaveService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = PropsContext;

  context!: ContextType<typeof PropsContext>;

  render() {
    //
    const { leaveService } = this.injected;
    const { leave } = leaveService;

    if (!leave) {
      return null;
    }

    return (
      <ContentWrapperView>
        <ContentReadView leave={leave} />
      </ContentWrapperView>
    );
  }
}

export default ServiceInjector.useContext(
  LeaveService,
)(ContentContainer);
