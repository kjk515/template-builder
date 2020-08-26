
import React from 'react';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import { ReactComponent, autobind, ServiceInjector, IdName } from '@nara.platform/accent';

import ContentView from '../view/ContentView';
import MemberParams from '../../../model/MemberParams';
import PunchParams from '../../../model/PunchParams';
import ProjectDailyTimelineService from '../../../service/ProjectDailyTimelineService';
import { PaginationService } from '~/lib';


interface Props {
  date?: Moment;
  onClickPunchInOutTime?: (params: PunchParams) => void;
  onClickMemberName?: (params: MemberParams) => void;
}

interface InjectedProps {
  projectDailyTimelineService: ProjectDailyTimelineService;
  paginationService: PaginationService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onClickPunchInOutTime: () => {},
  };

  today = moment().format('YYYY-MM-DD');

  onClickPunchInOutTime(manDayId: string, date: Moment) {
    //
    this.props.onClickPunchInOutTime!({ manDayId, date });
  }

  onClickMemberName(member: IdName) {
    //
    this.props.onClickMemberName!({ member });
  }

  render() {
    //
    const { projectDailyTimelineService, paginationService } = this.injected;
    const { manDayTimelineModels } = projectDailyTimelineService;
    const { startIndex } = paginationService;

    return (
      <ContentView
        manDayTimelineModels={manDayTimelineModels}
        onClickPunchInOutTime={this.onClickPunchInOutTime}
        onClickMemberName={this.onClickMemberName}
        startIndex={startIndex}
      />
    );
  }
}

export default ServiceInjector.useContext(
  ProjectDailyTimelineService,
  PaginationService
)(ContentContainer);

