
import React from 'react';
import { ReactComponent, autobind, ServiceInjector, NoSuchDataException } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { Calendar, CalendarTypes } from '@nara.platform/react-ui';
import { LeaveTeamMonthService, MemberService } from '~/lib/service';
import { DefaultCalendarConfig, MembersLeaveEventModel } from '../model';
import MembersLeaveEventView from '../view/MembersLeaveEventView';


interface Props {
  projectId: string;
  defaultDate: Moment;
  myLeaveActive?: boolean;
  onSelectEvent: (e: React.SyntheticEvent, date: Date, projectDayId: string) => void;
  selectable: boolean;
  selectBox: React.ReactNode;
  height?: string | number;
}

interface InjectedProps {
  extendedEventService: CalendarTypes.ExtendedEventService<MembersLeaveEventModel>;
  leaveTeamMonthService: LeaveTeamMonthService;
  memberService: MemberService;
}

@autobind
@observer
class MembersLeaveContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  componentDidMount() {
    //
    const { projectId, defaultDate } = this.props;

    this.findMembersLeaveEventsByMonth(projectId, defaultDate);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { projectId: prevProjectId } = prevProps;
    const { projectId, defaultDate } = this.props;

    if (prevProjectId !== projectId) {
      //
      this.findMembersLeaveEventsByMonth(projectId, defaultDate);
    }
  }

  async findMembersLeaveEventsByMonth(projectId: string, date: Moment): Promise<void> {
    //
    const { leaveTeamMonthService, extendedEventService } = this.injected;

    const leaveTeamMonth = await leaveTeamMonthService.findLeaveTeamMonthByProjectIdAndYearMonth(projectId, date);

    if (leaveTeamMonth != null) {
      const events = MembersLeaveEventModel.fromLeaveTeamMonth(leaveTeamMonth);

      this.activeMyLeaveDay(projectId, events);

      extendedEventService.setEvents(events);
    }
  }

  async activeMyLeaveDay(projectId: string, events: MembersLeaveEventModel[]) {
    //
    const { memberService } = this.injected;
    const { myLeaveActive } = this.props;

    if (myLeaveActive) {
      const member = await memberService.findMemberByProjectIdAndAudienceId(projectId);

      if (!member) {
        throw new NoSuchDataException('MembersLeaveContentContainer', `member is required -> projectId: ${projectId}`);
      }
      events.map(event => event.activeMyLeave(member.id));
    }
  }


  onNavigate({ date }: CalendarTypes.NavigateParams): void {
    //
    const { projectId } = this.props;
    const newDate = moment(date).startOf('month');

    this.findMembersLeaveEventsByMonth(projectId, newDate);
  }

  onSelectEvent(e: React.SyntheticEvent, calendarEvent: MembersLeaveEventModel) {
    //
    const { onSelectEvent } = this.props;

    onSelectEvent(e, calendarEvent.start, calendarEvent.projectId);
  }

  getDefaultCalendarConfig(): DefaultCalendarConfig {
    //
    const { height } = this.props;
    const style = {
      height: height || 600,
      additionalClassName: 'punch-calendar',
    };

    return {
      style,
    };
  }

  render() {
    //
    const { events } = this.injected.extendedEventService;
    const { defaultDate, selectable, selectBox } = this.props;

    if (selectable) {
      return (
        <Calendar
          {...this.getDefaultCalendarConfig()}
          defaultDate={defaultDate}
          events={events}
          eventComponent={MembersLeaveEventView}
          onNavigate={this.onNavigate}
          onSelectEvent={this.onSelectEvent}
          addedHeaderComponent={selectBox}
        />
      );
    }
    else {
      return (
        <Calendar
          {...this.getDefaultCalendarConfig()}
          defaultDate={defaultDate}
          events={events}
          eventComponent={MembersLeaveEventView}
          onNavigate={this.onNavigate}
          onSelectEvent={this.onSelectEvent}
        />
      );
    }

  }
}

export default ServiceInjector.with(
  CalendarTypes.ExtendedEventService,
  LeaveTeamMonthService,
  MemberService,
)(MembersLeaveContentContainer);
