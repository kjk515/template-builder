import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { ManMonthsService, PaginationService } from '~/lib/service';
import ProjectMonthlyLogContext from '../context/ProjectMonthlyLogContext';
import ProjectMonthlyLogService from '../service/ProjectMonthlyLogService';


interface Props {
  projectId: string;
  date: Date | Moment;
  children: React.ReactNode;
  listCountPerPage?: number;
}

interface InjectedProps {
  manMonthsService: ManMonthsService;
  projectMonthlyLogService: ProjectMonthlyLogService;
  paginationService: PaginationService;
}

/**
 * 한달 출퇴근 로그 컴포넌트입니다.
 */
@autobind
@observer
class ProjectMonthlyLogContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  today = moment();

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

  getContext() {
    //
    return {
      projectMonthlyLog: {
        onChangePage: this.onChangePage,
      },
    };
  }

  init() {
    //
    const { projectId, listCountPerPage } = this.props;
    const { projectMonthlyLogService, paginationService } = this.injected;
    const date = this.getMomentDate();

    paginationService.initOffsetAndLimit(0, listCountPerPage || 20);

    projectMonthlyLogService.setYearMonth(moment(date));
    projectMonthlyLogService.setYearMonthDates(moment(date));

    this.findManMonths(projectId, date);
  }

  findManMonths(projectId: string, date: Moment) {
    //
    const { manMonthsService, paginationService } = this.injected;

    const offset = paginationService.getOffsetModel();

    manMonthsService.findManMonthsByProjectIdAndYearMonthAndOffset(projectId, date, offset)
      .then(() => paginationService.updateStartIndex());
  }

  onChangePage(page: number) {
    //
    const { projectId } = this.props;
    const { projectMonthlyLogService, paginationService } = this.injected;
    const { date } = projectMonthlyLogService;

    paginationService.updateOffsetByPage(page);
    paginationService.setCurrentPage(page);

    this.findManMonths(projectId, date);
  }

  getMomentDate() {
    //
    const { date } = this.props;

    return moment(date);
  }

  render() {
    //
    return (
      <ProjectMonthlyLogContext.Provider value={this.getContext()}>
        {this.props.children}
      </ProjectMonthlyLogContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  ManMonthsService,
  ProjectMonthlyLogService,
  PaginationService,
)(ProjectMonthlyLogContainer);
