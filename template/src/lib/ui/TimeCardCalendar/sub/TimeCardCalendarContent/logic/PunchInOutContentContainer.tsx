import React from 'react';
import { autobind, NoSuchDataException, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { Calendar, CalendarTypes } from '@nara.platform/react-ui';
import { ManDaysService, MemberService } from '~/lib/service';
import { DefaultCalendarConfig, PunchInOutEventModel } from '../model';
import PunchInOutEventView from '../view/PunchInOutEventView';


interface Props {
  projectId: string;
  defaultDate: Moment;
  onSelectEvent: (e: React.SyntheticEvent, date: Date, memberId: string, manDayId: string) => void;
  onClickPunchInOut: (manDayId: string) => void;
  selectable: boolean;
  selectBox: React.ReactNode;
  height?: string | number;
}

interface InjectedProps {
  extendedEventService: CalendarTypes.ExtendedEventService<PunchInOutEventModel>;
  memberService: MemberService;
  manDaysService: ManDaysService;
}

@autobind
@observer
class PunchInOutContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  componentDidMount() {
    //
    const { projectId, defaultDate } = this.props;

    this.findPunchInOutEventsByMonth(projectId, defaultDate);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { projectId: prevProjectId } = prevProps;
    const { projectId, defaultDate } = this.props;

    if (prevProjectId !== projectId) {
      //
      this.findPunchInOutEventsByMonth(projectId, defaultDate);
    }
  }

  async findPunchInOutEventsByMonth(projectId: string, date: Moment) {
    //
    const { manDaysService, memberService, extendedEventService } = this.injected;

    const member = await memberService.findMemberByProjectIdAndAudienceId(projectId);

    if (!member) {
      throw new NoSuchDataException('PunchInOutContent', `member is required -> projectId: ${projectId}`);
    }

    const manDays = await manDaysService.findManDaysByMemberIdAndYearMonth(member.id, date);
    const events = PunchInOutEventModel.fromManDays(manDays);

    extendedEventService.setEvents(events);
  }

  onNavigate({ date }: CalendarTypes.NavigateParams): void {
    //
    const { projectId } = this.props;

    const newDate = moment(date).startOf('month');

    this.findPunchInOutEventsByMonth(projectId, newDate);
  }

  onSelectEvent(e: React.SyntheticEvent, calendarEvent: PunchInOutEventModel) {
    //
    const { onSelectEvent } = this.props;

    onSelectEvent(e, calendarEvent.start, calendarEvent.memberId, calendarEvent.manDayId);
  }

  renderPunchInOutEvent(props: any) {
    //
    const { onClickPunchInOut } = this.props;

    return (
      <PunchInOutEventView
        {...props}
        onClickPunchInOutButton={onClickPunchInOut}
      />
    );
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
          eventComponent={this.renderPunchInOutEvent}
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
          eventComponent={this.renderPunchInOutEvent}
          onNavigate={this.onNavigate}
          onSelectEvent={this.onSelectEvent}
        />
      );
    }
  }
}

export default ServiceInjector.with(
  CalendarTypes.ExtendedEventService,
  MemberService,
  ManDaysService,
)(PunchInOutContentContainer);
