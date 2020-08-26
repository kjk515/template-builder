
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import React from 'react';
import { LeaveCountsRdoService } from '~/lib/service';
import LeaveSummaryView from '../view/LeaveSummaryView';


interface Props {
  date: Moment | Date;
  memberId: string;
}

interface InjectedProps {
  leaveCountsRdoService: LeaveCountsRdoService;
}

/**
 * TimeCard 휴가내역 Summary 컴포넌트입니다.
 */
@autobind
@observer
class LeaveSummaryContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    date: moment(),
  };

  componentDidMount() {
    //
    const { date } = this.props;

    this.init(date);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { date: prevDate } = prevProps;
    const { date } = this.props;

    if (prevDate !== date) {
      this.init(date);
    }
  }

  init(date: Moment | Date) {
    //
    const { memberId } = this.props;
    const year = moment(date).format('YYYY');

    this.findLeaveSummary(year, memberId);
  }

  findLeaveSummary(year: string, memberId: string) {
    //
    const { leaveCountsRdoService } = this.injected;

    leaveCountsRdoService.findLeaveSummary(memberId, year);
  }

  render() {
    //
    const { leaveSummary } = this.injected.leaveCountsRdoService;

    return (
      <LeaveSummaryView
        leaveSummary={leaveSummary}
      />
    );
  }
}

export default ServiceInjector.withContext(
  LeaveCountsRdoService,
)(LeaveSummaryContainer);
