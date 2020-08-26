
import React from 'react';
import moment, { Moment } from 'moment';
import EventType from '../model/EventType';


export interface TimeCardCalendarContextModel {
  //
  timeCardCalendar: {
    projectId: string;
    defaultDate: Moment;
    eventType: EventType;
    selectable: boolean;
    selectableEventTypes: EventType[];
    changeEventType: (dataType: EventType) => void;
  };
}

const TimeCardCalendarContext = React.createContext<TimeCardCalendarContextModel>({
  timeCardCalendar: {
    projectId: '',
    defaultDate: moment(),
    eventType: EventType.PunchInOut,
    selectable: false,
    selectableEventTypes: [],
    changeEventType: () => {},
  },
});

export default TimeCardCalendarContext;
