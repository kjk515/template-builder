import React, { ContextType } from 'react';
import { autobind, InvalidPropsException, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { NameTextModel } from '@nara.platform/react-ui';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import MembersLeaveEventParams from '../model/MembersLeaveEventParams';
import PunchInOutEventParams from '../model/PunchInOutEventParams';

import EventType from '../../../model/EventType';
import TimeCardCalendarContext from '../../../context/TimeCardCalendarContext';
import PunchInOutContentContainer from './PunchInOutContentContainer';
import MembersLeaveContentContainer from './MembersLeaveContentContainer';
import { EventTextType } from '~/lib/ui/TimeCardCalendar/model';


interface Props {
  height?: string | number;
  onClickPunchInOutEvent?: (event: React.SyntheticEvent, params: PunchInOutEventParams) => void;
  onClickMembersLeaveEvent?: (event: React.SyntheticEvent, params: MembersLeaveEventParams) => void;
  onClickPunchInOut?: (manDayId: string) => void;
  myLeaveActive?: boolean;
}

/**
 * TimeCard Content 컴포넌트입니다.
 */
@autobind
@observer
class CalendarContentContainer extends ReactComponent<Props, {}> {
  //
  static defaultProps = {
    onClickDayEvent: () => {},
    onClickPunchInOut: () => {},
    onClickPunchInOutEvent: () => {},
    onClickMembersLeaveEvent: () => {},
    myLeaveActive: true,
  };

  static contextType = TimeCardCalendarContext;

  context!: ContextType<typeof TimeCardCalendarContext>;


  onSelectPunchInOutEvent(event: React.SyntheticEvent, date: Date, memberId: string, manDayId: string) {
    //
    const { onClickPunchInOutEvent } = this.props;

    if (typeof onClickPunchInOutEvent !== 'function') {
      throw new InvalidPropsException('TimeCardCalendar.Content', 'onClickDayEvent1 is not a function');
    }

    const params = {
      date,
      memberId,
      manDayId,
    };

    onClickPunchInOutEvent(event, params);
  }

  onSelectMembersLeaveEvent(event: React.SyntheticEvent, date: Date, projectId: string) {
    //
    const { onClickMembersLeaveEvent } = this.props;

    if (typeof onClickMembersLeaveEvent !== 'function') {
      throw new InvalidPropsException('TimeCardCalendar.Content', 'onClickDayEvent2 is not a function');
    }

    const params = {
      date,
      projectId,
    };

    onClickMembersLeaveEvent(event, params);
  }

  onClickPunchInOut(manDayId: string) {
    //
    const { onClickPunchInOut } = this.props;

    if (typeof onClickPunchInOut !== 'function') {
      throw new InvalidPropsException('TimeCardCalendarContent', 'onClickPunchInOut is not a function');
    }

    onClickPunchInOut(manDayId);
  }

  getSelectableEventOptions() {
    //
    const { selectableEventTypes } = this.context.timeCardCalendar;

    return selectableEventTypes.map((eventType, index) =>
      new NameTextModel(index.toString(), EventTextType[eventType], eventType)
    );
  }

  onChangeEventType(e: React.SyntheticEvent, { value }: DropdownProps): void {
    //
    const { timeCardCalendar } = this.context;
    const eventType = EventType[value as EventType];

    timeCardCalendar.changeEventType(eventType);
  }

  getSelectBox(): React.ReactNode {
    const { eventType } = this.context.timeCardCalendar;

    return (
      <div className="ab-right-top">
        <Dropdown
          selection
          options={this.getSelectableEventOptions()}
          value={eventType}
          onChange={this.onChangeEventType}
        />
      </div>
    );
  }

  render() {
    //
    const { projectId, defaultDate, eventType, selectable } = this.context.timeCardCalendar;
    const { myLeaveActive, height } = this.props;

    switch (eventType) {
      case EventType.PunchInOut:
        return (
          <PunchInOutContentContainer
            projectId={projectId}
            defaultDate={defaultDate}
            onSelectEvent={this.onSelectPunchInOutEvent}
            onClickPunchInOut={this.onClickPunchInOut}
            height={height}
            selectable={selectable}
            selectBox={selectable ? this.getSelectBox() : null}
          />
        );
      case EventType.MembersLeave:
        return (
          <MembersLeaveContentContainer
            projectId={projectId}
            defaultDate={defaultDate}
            onSelectEvent={this.onSelectMembersLeaveEvent}
            myLeaveActive={myLeaveActive}
            height={height}
            selectable={selectable}
            selectBox={selectable ? this.getSelectBox() : null}
          />
        );
      default:
        throw new InvalidPropsException('TimeCardCalendar.Content', `eventType -> ${eventType}`);
    }
  }
}

export default CalendarContentContainer;
