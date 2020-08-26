
import React, { ContextType } from 'react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { DateCarousel, DateCarouselTypes } from '@nara.platform/react-ui';

import { observer } from 'mobx-react';
import moment from 'moment';

import { PanelSubFields } from '~/lib/ui/shared';
import TimelineDateSelectionService from '../../../service/TimelineDateSelectionService';
import ProjectDailyPunchTimelineContext from '../../../context/ProjectDailyPunchTimelineContext';
import ProjectDailyTimelineService from '../../../service/ProjectDailyTimelineService';


interface InjectedProps {
  projectDailyTimelineService: ProjectDailyTimelineService;
  timelineDateSelectionService: TimelineDateSelectionService;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = ProjectDailyPunchTimelineContext;

  context!: ContextType<typeof ProjectDailyPunchTimelineContext>;


  onClickDate({ date }: DateCarouselTypes.DateCarouselParams) {
    //
    const { punchTimeLine } = this.context;
    const { timelineDateSelectionService } = this.injected;
    const selectedDate = moment(date);

    timelineDateSelectionService.setSelectedDate(selectedDate);
    punchTimeLine.findPunchTimelines(selectedDate);
  }

  render() {
    //
    const { totalCount } = this.injected.projectDailyTimelineService;
    const { selectedDate } = this.injected.timelineDateSelectionService;

    return (
      <>
        <DateCarousel
          untilThisWeek
          date={selectedDate}
          onClickDate={this.onClickDate}
        />
        <PanelSubFields>
          <PanelSubFields.LabelGroup width={8} verticalAlign="middle">
            <span>전체 구성원 <span className="count">{totalCount ? `'${totalCount}'` : `'00'`}</span> 명</span>
          </PanelSubFields.LabelGroup>
          <PanelSubFields.LabelGroup className="icon-info" textAlign="right" verticalAlign="middle" width={8}>
            <div>
              <div className="rectangle skyblue" />
              정상
            </div>
            <div>
              <div className="rectangle blue" />
              근무중
            </div>
            <div>
              <div className="rectangle red" />
              퇴근 미처리
            </div>
          </PanelSubFields.LabelGroup>

        </PanelSubFields>
      </>
    );
  }
}

export default ServiceInjector.useContext(
  ProjectDailyTimelineService,
  TimelineDateSelectionService)(HeaderContainer);
