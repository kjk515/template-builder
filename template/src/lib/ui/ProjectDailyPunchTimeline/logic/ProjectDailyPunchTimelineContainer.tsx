
import React from 'react';
import moment, { Moment } from 'moment';
import { observer } from 'mobx-react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';

import TimelineDateSelectionService from '../service/TimelineDateSelectionService';
import ProjectDailyTimelineService from '../service/ProjectDailyTimelineService';
import ProjectDailyPunchTimelineContext from '../context/ProjectDailyPunchTimelineContext';
import { PaginationService } from '~/lib';


interface Props {
  projectId: string;
  date?: Date | Moment;
  listCountPerPage?: number;
}

interface InjectedProps {
  projectDailyTimelineService: ProjectDailyTimelineService;
  timelineDateSelectionService: TimelineDateSelectionService;
  paginationService: PaginationService;
}

/**
 * 멤버들의 한달 출퇴근 로그 컴포넌트입니다.
 */
@autobind
@observer
class ProjectDailyPunchTimelineContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    listCountPerPage: 20,
  };

  today = moment();

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>) {
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
      punchTimeLine: {
        findPunchTimelines: this.refreshTimelineByDate,
        onChangePage: this.onChangePage,
      },
    };
  }

  async init() {
    //
    const { projectId, listCountPerPage } = this.props;
    const { paginationService } = this.injected;

    paginationService.initOffsetAndLimit(0, listCountPerPage || 20);

    this.findManDays(projectId, this.getMomentDate());
  }

  refreshTimelineByDate(date: Moment) {
    //
    const { projectId } = this.props;
    const { timelineDateSelectionService } = this.injected;

    timelineDateSelectionService.setSelectedDate(date);

    this.findManDays(projectId, date);
  }

  findManDays(projectId: string, date: Moment) {
    //
    const { projectDailyTimelineService, paginationService } = this.injected;

    const offset = paginationService.getOffsetModel();

    projectDailyTimelineService.findManDaysAndMakeTimelines(projectId, date, offset)
      .then(() => paginationService.updateStartIndex());
  }

  onChangePage(page: number) {
    //
    const { projectId } = this.props;
    const { paginationService, timelineDateSelectionService } = this.injected;
    const { selectedDate } = timelineDateSelectionService;

    paginationService.updateOffsetByPage(page);
    paginationService.setCurrentPage(page);

    this.findManDays(projectId, selectedDate);
  }

  getMomentDate() {
    //
    const { date } = this.props;

    return moment(date);
  }

  render() {
    //
    return (
      <ProjectDailyPunchTimelineContext.Provider value={this.getContext()}>
        {this.props.children}
      </ProjectDailyPunchTimelineContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  TimelineDateSelectionService,
  ProjectDailyTimelineService,
  PaginationService,
)(ProjectDailyPunchTimelineContainer);
