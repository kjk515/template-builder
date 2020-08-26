import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Pagination } from '../../../shared';
import ProjectDailyPunchTimelineContext from '../../context/ProjectDailyPunchTimelineContext';
import TimelineDateSelectionService from '../../service/TimelineDateSelectionService';
import ProjectDailyTimelineService from '../../service/ProjectDailyTimelineService';
import { PaginationService } from '~/lib';


interface InjectedProps {
  projectDailyTimelineService: ProjectDailyTimelineService;
  timelineDateSelectionService: TimelineDateSelectionService;
  paginationService: PaginationService;
}

@autobind
@observer
class FooterContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = ProjectDailyPunchTimelineContext;

  context!: ContextType<typeof ProjectDailyPunchTimelineContext>;


  render() {
    //
    const { paginationService, projectDailyTimelineService } = this.injected;
    const { totalCount } = projectDailyTimelineService;
    const { punchTimeLine } = this.context;

    const totalPages = paginationService.getTotalPages(totalCount);

    if (totalPages !== 0) {
      return (
        <Pagination
          totalPages={totalPages}
          onChangePage={punchTimeLine.onChangePage}
        />
      );
    }

    return null;
  }
}

export default ServiceInjector.useContext(
  ProjectDailyTimelineService,
  TimelineDateSelectionService,
  PaginationService,
)(FooterContainer);
