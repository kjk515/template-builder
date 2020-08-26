
import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';

import LeaveManMonthsService from '~/lib/service/leave/logic/LeaveManMonthsService';
import PaginationService from '~/lib/service/shared/PaginationService';

import ProjectMonthlyLeaveLogContext, { ProjectMonthlyLeaveLogContextModel } from '../context/ProjectMonthlyLeaveLogContext';


interface Props {
  projectId: string;
  date: Moment | Date;
  listCountPerPage?: number;
}

interface InjectedProps {
  leaveManMonthsService: LeaveManMonthsService;
  paginationService: PaginationService;
}

/**
 * 한달 휴가 로그 컴포넌트입니다.
 */
@autobind
@observer
class ProjectMonthlyLeaveLogContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    listCountPerPage: 20,
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { date: prevDate, projectId: prevProjectId } = prevProps;
    const { date, projectId } = this.props;

    if (prevDate !== date || prevProjectId !== projectId) {
      this.init();
    }
  }

  getContext(): ProjectMonthlyLeaveLogContextModel {
    //
    const momentDate = this.getMomentDate();

    return {
      projectMonthlyLeaveLogContext: {
        onChangePage: this.onChangePage,
        date: momentDate,
      },
    };
  }

  async init() {
    //
    const { projectId, listCountPerPage } = this.props;
    const { paginationService } = this.injected;

    paginationService.initOffsetAndLimit(0, listCountPerPage || 20);

    this.findLeaveManMonths(projectId, this.getMomentDate());
  }

  findLeaveManMonths(projectId: string, yearMonth: Moment) {
    //
    const { leaveManMonthsService, paginationService } = this.injected;

    const offset = paginationService.getOffsetModel();

    leaveManMonthsService.findLeaveManMonthsByProjectIdAndYearMonth(projectId, yearMonth, offset)
      .then(() => paginationService.updateStartIndex());
  }

  onChangePage(page: number) {
    //
    const { projectId } = this.props;
    const { paginationService } = this.injected;

    paginationService.updateOffsetByPage(page);
    paginationService.setCurrentPage(page);

    this.findLeaveManMonths(projectId, this.getMomentDate());
  }

  getMomentDate() {
    //
    const { date } = this.props;

    return moment(date);
  }

  render() {
    //
    return (
      <ProjectMonthlyLeaveLogContext.Provider
        value={this.getContext()}
      >
        {this.props.children}
      </ProjectMonthlyLeaveLogContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  LeaveManMonthsService,
  PaginationService
)(ProjectMonthlyLeaveLogContainer);

