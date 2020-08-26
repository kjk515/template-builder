
import React from 'react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LeaveService } from '~/lib/service';
import PropsContext from '../context/PropsContext';


interface Props {
  children: React.ReactNode;
  leaveId: string;
  personal?: boolean;
}

interface InjectedProps {
  leaveService: LeaveService;
}

/**
 *  휴가 모달 컴포넌트입니다.
 */
@autobind
@observer
class LeaveCheckerContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { leaveId: prevLeaveId } = prevProps;
    const { leaveId } = this.props;

    if (leaveId && prevLeaveId !== leaveId) {
      this.findLeave(leaveId);
    }
  }

  init() {
    //
    const { leaveId } = this.props;

    this.findLeave(leaveId);
  }

  findLeave(leaveId: string) {
    //
    const { leaveService } = this.injected;

    leaveService.findLeave(leaveId);
  }

  getContext() {
    const { leaveId = '', personal = false } = this.props;

    return { leaveId, personal };
  }

  render() {
    //
    return (
      <PropsContext.Provider value={this.getContext()}>
        {this.props.children}
      </PropsContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  LeaveService,
)(LeaveCheckerContainer);
