import React from 'react';
import { autobind, InvalidPropsException, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { EventType, PropsEventType } from '../model';
import TimeCardCalendarContext, { TimeCardCalendarContextModel } from '../context/TimeCardCalendarContext';


interface Props {
  eventType: PropsEventType;
  children: React.ReactNode;
  projectId: string;
  defaultDate?: Moment | Date;
  selectableEventTypes?: (PropsEventType.PunchInOut | PropsEventType.MembersLeave)[];
  myLeaveActive?: boolean;
}

interface State {
  eventType: EventType;
}

/**
 * TimeCardCalendar 컴포넌트입니다.
 */
@autobind
@observer
class TimeCardCalendarContainer extends ReactComponent<Props, State> {
  //
  static defaultProps = {
    defaultDate: moment(),
    selectableEventTypes: [],
    myLeaveActive: false,
  };

  state: State = {
    eventType: EventType.PunchInOut,
  };


  componentDidMount() {
    //
    this.initDateAndEventType();
  }

  getContext(): TimeCardCalendarContextModel {
    //
    const { projectId, eventType } = this.props;

    return {
      timeCardCalendar: {
        projectId,
        defaultDate: this.getDefaultDate(),
        eventType: this.getEventType(),
        selectable: eventType === PropsEventType.Selectable,
        selectableEventTypes: this.getSelectableEventTypes(),
        changeEventType: this.changeEventType,
      },
    };
  }

  getDefaultDate(): Moment {
    //
    const { defaultDate } = this.props;

    return moment.isMoment(defaultDate) ? defaultDate : moment(defaultDate);
  }

  getEventType(): EventType {
    //
    return this.state.eventType;
  }

  getSelectableEventTypes(): EventType[] {
    //
    const { selectableEventTypes } = this.props;

    if (!selectableEventTypes) {
      throw new InvalidPropsException('TimeCardCalendar', 'selectableEventTypes');
    }
    return selectableEventTypes.map(eventType => EventType[eventType]);
  }

  changeEventType(eventType: EventType) {
    //
    this.setState({ eventType });
  }


  initDateAndEventType(): void {
    //
    const { eventType: propsEventType } = this.props;

    if (propsEventType === PropsEventType.Selectable) {
      this.setSelectableEventType();
    }
    else {
      const eventType = EventType[propsEventType];

      this.changeEventType(eventType);
    }
  }

  setSelectableEventType() {
    //
    const { selectableEventTypes: propsSelectableEventTypes } = this.props;

    if (!Array.isArray(propsSelectableEventTypes) || propsSelectableEventTypes.length < 1) {
      throw new InvalidPropsException('TimeCardCalendar', 'eventType is Selectable. But selectableEventTypes is empty');
    }
    const selectableEventTypes = propsSelectableEventTypes.map(type => EventType[type]);
    const defaultEventType = selectableEventTypes[0];

    this.changeEventType(defaultEventType);
  }

  render() {
    //
    return (
      <TimeCardCalendarContext.Provider
        value={this.getContext()}
      >
        {this.props.children}
      </TimeCardCalendarContext.Provider>
    );
  }
}

export default TimeCardCalendarContainer;
